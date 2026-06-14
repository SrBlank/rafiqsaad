import { useState, useEffect, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

const base = import.meta.env.BASE_URL;

// ── types ─────────────────────────────────────────────────────────────────────

type ArtifactKey = "CLAUDE.md" | "GRAPH_REPORT.md" | ".graphify_labels.json";

const ARTIFACTS: { key: ArtifactKey; label: string; description: string }[] = [
  {
    key: "CLAUDE.md",
    label: "CLAUDE.md",
    description: "Injected into every Claude Code session — tells the LLM that a knowledge graph exists and how to query it.",
  },
  {
    key: "GRAPH_REPORT.md",
    label: "GRAPH_REPORT.md",
    description: "The LLM's reference document — community structure, god nodes, surprising edges, and suggested questions about the codebase.",
  },
  {
    key: ".graphify_labels.json",
    label: ".graphify_labels.json",
    description: "Human-curated community labels — maps numeric community IDs to meaningful names that appear throughout the report and graph.",
  },
];

// ── corpus metrics ─────────────────────────────────────────────────────────────

const corpusStats = [
  { label: "Total files", value: "7,461" },
  { label: "Total directories", value: "701" },
  { label: "Total lines", value: "~910K" },
];

const fileTypes = [
  { ext: ".c",   count: "1,544", note: "C source" },
  { ext: ".h",   count: "1,020", note: "Headers" },
  { ext: ".out", count: "869",   note: "Expected test output" },
  { ext: ".sql", count: "855",   note: "SQL tests & scripts" },
  { ext: ".po",  count: "467",   note: "Translations" },
  { ext: ".sgml",count: "430",   note: "Documentation" },
  { ext: ".pl",  count: "360",   note: "Perl scripts" },
  { ext: ".pgc", count: "72",    note: "Embedded C (ecpg)" },
  { ext: "(none)", count: "496", note: "" },
];

// ── usage session ─────────────────────────────────────────────────────────────

const SESSION = [
  {
    prompt: "Give me a high-level map of how PostgreSQL processes a query — from the moment a client sends SQL to when rows are returned.",
    response: `\`\`\`
Client (psql / libpq)
       │ TCP or Unix socket
       ▼
PHASE 0 — Connection & Message Loop
  Postmaster forks a backend. PostgresMain() reads the wire.
  Simple query → exec_simple_query(). Extended protocol → exec_bind/execute.
       │ raw SQL string
       ▼
PHASE 1 — Parsing
  pg_parse_query() feeds SQL to flex/bison. Produces a raw parse tree (RawStmt list).
  No catalog lookups yet.
       │ raw parse tree
       ▼
PHASE 2 — Analysis & Rewriting
  pg_analyze_and_rewrite(): resolves names, assigns types, builds Query struct.
  QueryRewrite() fires pg_rewrite rules (views, row-security).
       │ List of Query
       ▼
PHASE 3 — Planning / Optimization
  standard_planner(): enumerates access paths, join ordering via DP (≤8 rels)
  or GEQO (genetic algo). costsize.c estimates costs using pg_statistic.
       │ PlannedStmt
       ▼
PHASE 4 — Execution (Volcano / Iterator model)
  ExecutorRun(): ExecProcNode() pulls tuples bottom-up.
  JIT compilation (LLVM) for hot expression evaluation.
  Parallel workers via DSM + Gather/GatherMerge.
       │ tuple demand
       ▼
PHASE 5 — Storage (called during execution)
  ReadBuffer() pins 8KB pages. MVCC visibility check.
  heap_getnext() / index_getnext() returns visible tuples.
  DML: WAL record written before data change.
       │ DataRow messages
       ▼
PHASE 6 — Result Transmission
  Tuples serialized to FE/BE protocol: DataRow (T) → CommandComplete (C).
\`\`\`

**Key structural insight:** \`postgres.c\` is the central hub — \`exec_simple_query()\` calls parse → analyze → plan → portal in four lines. 40K+ nodes across 1,467 communities hang off that chain.`,
  },
  {
    prompt: "What is the relationship between the COPY FROM infrastructure and the logical replication apply worker? Do they share code paths?",
    response: `Two parallel paths that share the bottom half of the executor.

**Initial table sync** (\`tablesync.c:copy_table()\`): directly calls \`CopyFrom()\` with a custom \`copy_read_data\` callback that reads from the WAL receiver instead of a file. Gets bulk-insert performance (batching N tuples via \`table_multi_insert()\`) for free.

**Ongoing apply** (\`worker.c:apply_handle_insert()\`): never touches \`CopyFrom()\`. Decodes one tuple at a time from the logical decoding stream → \`ExecSimpleRelationInsert()\` in \`execReplication.c\` → \`ExecInsert()\` in \`nodeModifyTable.c\`.

| Layer | Shared? |
|---|---|
| \`ExecInsertIndexTuples()\` | ✓ Both call execIndexing.c |
| \`ExecARInsertTriggers()\` | ✓ AFTER INSERT triggers |
| Table AM (\`tableam.h\`) | ✓ Different entry points: \`table_multi_insert()\` vs \`table_tuple_insert()\` |
| Format decoding | ✗ COPY uses copyfrom_parse.c; apply uses proto.c |
| Batching | ✗ COPY batches; apply is 1-tuple |

\`execReplication.c\` is the apply worker's private executor shim — it lets the apply worker drive executor machinery without going through the full planner/portal path.`,
  },
  {
    prompt: "If I needed to change how transaction IDs are assigned, what would be affected and what's the blast radius?",
    response: `Depends on the type of change:

| Change type | Blast radius |
|---|---|
| Assignment policy (skip XIDs, start value) | Moderate — stays within transam layer |
| Wraparound comparison semantics | Very large — every visibility check |
| Width (32 → 64 bit) | Catastrophic — breaks on-disk format everywhere |

**The concentric rings:**
\`\`\`
[1] varsup.c:GetNewTransactionId()     ← single assignment point
   [2] htup_details.h                  ← XID stamped on every tuple (DISK FORMAT)
      [3] clog.c / commit_ts.c         ← XID→status maps (DISK FORMAT)
         [4] procarray.c / snapmgr.c   ← snapshot construction
            [5] heapam.c visibility    ← every tuple scan (HOT PATH)
               [6] vacuum / freeze     ← wraparound prevention
               [7] xlog.c / WAL       ← recovery (DISK FORMAT)
               [8] reorderbuffer.c     ← logical replication
               [9] predicate.c (SSI)
[Tools] pg_resetwal, pg_upgrade, pg_dump, amcheck
[SQL]   xid type, xmin/xmax syscolumns, snapshot functions
\`\`\`

A policy change touches rings 1–3. A width change (32→64 bit) breaks every ring, every tool, and every on-disk data file — it requires either a new storage format or a full data directory migration.`,
  },
];

// ── components ────────────────────────────────────────────────────────────────

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl bg-card border border-border p-6 ${className}`}>{children}</div>
);

function ArtifactViewer() {
  const [active, setActive] = useState<ArtifactKey>("CLAUDE.md");
  const [contents, setContents] = useState<Record<string, string>>({});

  useEffect(() => {
    ARTIFACTS.forEach(({ key }) => {
      fetch(`${base}demo/graphify/${key}`)
        .then(r => r.ok ? r.text() : null)
        .then(text => { if (text) setContents(prev => ({ ...prev, [key]: text })); })
        .catch(() => {});
    });
  }, []);

  const activeArtifact = ARTIFACTS.find(a => a.key === active)!;
  const content = contents[active];

  return (
    <div className="flex flex-col md:flex-row gap-0 rounded-xl border border-border overflow-hidden">
      {/* Sidebar */}
      <div className="md:w-48 shrink-0 bg-muted/50 border-b md:border-b-0 md:border-r border-border">
        <div className="p-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Artifacts</p>
          {ARTIFACTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono transition-colors flex items-center gap-2 ${
                active === key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0">
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">{activeArtifact.description}</p>
        </div>
        <div className="p-5 overflow-auto max-h-[500px]">
          {content ? (
            <div className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:text-xs
              prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
              prose-strong:text-foreground prose-li:text-muted-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading…</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────

const DemoGraphify = () => {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => { if (!wasDark) root.classList.remove("dark"); };
  }, []);

  return (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-14">

    {/* Intro */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-4xl font-bold tracking-tight mb-3">Graphify</h1>
      <p className="text-muted-foreground mb-6">
        Graphify builds a knowledge graph from source code that LLMs can query for structural understanding of a codebase — without exposing raw source. Tested here against the <strong className="text-foreground">PostgreSQL</strong> repository, an enterprise-grade C codebase.
      </p>

      {/* Corpus metrics */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-4">
        {corpusStats.map(({ label, value }) => (
          <div key={label} className="text-center p-3 rounded-lg bg-card border border-border">
            <p className="text-xl font-bold text-primary">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* File types table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground">Extension</th>
              <th className="text-right px-4 py-2 text-xs font-semibold text-muted-foreground">Count</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-muted-foreground hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {fileTypes.map(({ ext, count, note }, i) => (
              <tr key={ext} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-4 py-1.5 font-mono text-xs text-foreground">{ext}</td>
                <td className="px-4 py-1.5 text-right text-xs text-muted-foreground">{count}</td>
                <td className="px-4 py-1.5 text-xs text-muted-foreground hidden sm:table-cell">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>

    {/* Usage example */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      <h2 className="text-2xl font-bold mb-2">Usage Example</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Three queries against the PostgreSQL graph, answered in seconds with no source browsing.
      </p>
      <div className="space-y-6">
        {SESSION.map(({ prompt, response }, i) => (
          <div key={i} className="space-y-2">
            <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3">
              <p className="text-xs font-semibold text-primary mb-1">Prompt {i + 1}</p>
              <p className="text-sm">{prompt}</p>
            </div>
            <div className="rounded-lg bg-card border border-border px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Response</p>
              <div className="prose prose-sm dark:prose-invert max-w-none
                prose-p:text-muted-foreground prose-p:my-1 prose-p:leading-relaxed
                prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:text-xs prose-pre:my-2
                prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
                prose-strong:text-foreground prose-li:text-muted-foreground prose-li:my-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Artifact viewer */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
      <h2 className="text-2xl font-bold mb-2">Artifacts</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Everything graphify produces lives directly in the repo — no external service, no database. Drop it in, commit it, and it travels with the code.
      </p>
      <div className="rounded-lg bg-muted/40 border border-border px-5 py-4 font-mono text-xs text-muted-foreground mb-6 leading-relaxed">
        <p className="text-foreground font-semibold mb-1">postgres/</p>
        <p className="pl-4">CLAUDE.md</p>
        <p className="pl-4">graphify-out/</p>
        <p className="pl-8">graph.json <span className="text-muted-foreground/60">(~70 MB — full symbol graph)</span></p>
        <p className="pl-8">GRAPH_REPORT.md</p>
        <p className="pl-8">.graphify_labels.json</p>
        <p className="pl-8">graph_top5000.html</p>
      </div>
      <ArtifactViewer />
    </motion.div>

    {/* Graph visual */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <h2 className="text-2xl font-bold mb-2">Code Graph Visual</h2>
      <Card>
        <p className="text-sm text-muted-foreground mb-1">
          For humans only — not consumed by the LLM. The full graph has ~40,000 nodes; this view is reduced to the top 5,000 for rendering.
        </p>
        <p className="text-xs text-muted-foreground mb-4">May take a moment to load.</p>
        <a
          href={`${base}demo/graphify/graph_top5000.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
        >
          Open graph visualization <ExternalLink className="h-4 w-4" />
        </a>
      </Card>
    </motion.div>

  </div>
  );
};

export default DemoGraphify;
