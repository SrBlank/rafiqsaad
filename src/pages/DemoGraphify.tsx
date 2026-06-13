import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Network, Zap, HelpCircle, AlertTriangle, DollarSign, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const base = import.meta.env.BASE_URL;
const ARTIFACT_ROOT = `${base}demo/graphify/`;

// ── types for graphify artifacts ──────────────────────────────────────────────

interface GraphJson {
  nodes: { id: string; label?: string; community?: number; [k: string]: unknown }[];
  links: { source: string; target: string; relation?: string; confidence?: string }[];
}

interface GodNode {
  id: string;
  label?: string;
  degree?: number;
  community?: number;
}

interface Surprise {
  source_label?: string;
  target_label?: string;
  confidence?: string;
  reasons?: string[];
}

interface Question {
  type?: string;
  question: string;
  why?: string;
}

interface Analysis {
  god_nodes?: GodNode[];
  surprises?: Surprise[];
  questions?: Question[];
}

interface Cost {
  input?: number;
  output?: number;
  cost_usd?: number;
}

// ── fetch helper ─────────────────────────────────────────────────────────────

async function tryFetch<T>(path: string, parser: "json" | "text"): Promise<T | null> {
  try {
    const r = await fetch(path);
    if (!r.ok) return null;
    return parser === "json" ? r.json() : r.text() as unknown as T;
  } catch {
    return null;
  }
}

// ── sub-components ────────────────────────────────────────────────────────────

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl bg-card border border-border p-6 ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
    <Icon className="h-5 w-5 text-primary" />
    {title}
  </h2>
);

function GraphStats({ graph }: { graph: GraphJson }) {
  const communityIds = [...new Set(graph.nodes.map(n => n.community).filter(c => c !== undefined))];

  const degreeMap: Record<string, number> = {};
  for (const link of graph.links) {
    degreeMap[link.source] = (degreeMap[link.source] ?? 0) + 1;
    degreeMap[link.target] = (degreeMap[link.target] ?? 0) + 1;
  }
  const topNodes = Object.entries(degreeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([id, deg]) => {
      const node = graph.nodes.find(n => n.id === id);
      return { label: node?.label ?? id, degree: deg };
    });

  const confidenceCounts = graph.links.reduce<Record<string, number>>((acc, l) => {
    const k = l.confidence ?? "UNKNOWN";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

  const statItems = [
    { label: "Nodes", value: graph.nodes.length },
    { label: "Edges", value: graph.links.length },
    { label: "Communities", value: communityIds.length },
  ];

  return (
    <Card>
      <SectionTitle icon={Network} title="Graph Overview" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {statItems.map(({ label, value }) => (
          <div key={label} className="text-center p-3 rounded-lg bg-muted">
            <p className="text-2xl font-bold text-primary">{value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {Object.keys(confidenceCounts).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(confidenceCounts).map(([conf, count]) => (
            <Badge key={conf} variant={conf === "EXTRACTED" ? "default" : conf === "INFERRED" ? "secondary" : "outline"}>
              {conf}: {count}
            </Badge>
          ))}
        </div>
      )}

      {topNodes.length > 0 && (
        <>
          <p className="text-sm font-semibold text-muted-foreground mb-2">Most connected nodes</p>
          <div className="space-y-1.5">
            {topNodes.map(({ label, degree }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs truncate max-w-[70%]">{label}</span>
                <span className="text-muted-foreground text-xs">{degree} connections</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}

function AnalysisSection({ analysis }: { analysis: Analysis }) {
  const godNodes = analysis.god_nodes?.slice(0, 8) ?? [];
  const surprises = analysis.surprises?.slice(0, 6) ?? [];
  const questions = analysis.questions?.slice(0, 8) ?? [];

  return (
    <div className="space-y-6">
      {godNodes.length > 0 && (
        <Card>
          <SectionTitle icon={Zap} title="God Nodes" />
          <p className="text-sm text-muted-foreground mb-4">
            Highly connected symbols that many other parts of the codebase depend on.
          </p>
          <div className="space-y-2">
            {godNodes.map((n, i) => (
              <div key={n.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                  <span className="font-mono text-xs">{n.label ?? n.id}</span>
                </div>
                {n.degree !== undefined && (
                  <Badge variant="secondary" className="text-xs">{n.degree} edges</Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {surprises.length > 0 && (
        <Card>
          <SectionTitle icon={AlertTriangle} title="Surprising Connections" />
          <p className="text-sm text-muted-foreground mb-4">
            Cross-community or cross-file edges that are unexpected given the graph structure.
          </p>
          <div className="space-y-3">
            {surprises.map((s, i) => (
              <div key={i} className="text-sm p-3 rounded-md border border-border bg-muted/30">
                <p className="font-mono text-xs">
                  <span className="text-primary">{s.source_label}</span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <span className="text-primary">{s.target_label}</span>
                </p>
                {s.confidence && (
                  <Badge variant="outline" className="text-xs mt-1">{s.confidence}</Badge>
                )}
                {s.reasons && s.reasons.length > 0 && (
                  <p className="text-muted-foreground text-xs mt-1">{s.reasons[0]}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {questions.length > 0 && (
        <Card>
          <SectionTitle icon={HelpCircle} title="Suggested Questions" />
          <p className="text-sm text-muted-foreground mb-4">
            Questions the graph is uniquely positioned to answer about this codebase.
          </p>
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="text-sm p-3 rounded-md border border-border">
                {q.type && (
                  <Badge variant="outline" className="text-xs mb-2">{q.type}</Badge>
                )}
                <p className="font-medium">{q.question}</p>
                {q.why && <p className="text-muted-foreground text-xs mt-1">{q.why}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function CostCard({ cost }: { cost: Cost }) {
  return (
    <Card>
      <SectionTitle icon={DollarSign} title="LLM Cost" />
      <div className="flex flex-wrap gap-6 text-sm">
        {cost.input !== undefined && (
          <div>
            <p className="text-muted-foreground text-xs">Input tokens</p>
            <p className="font-semibold">{cost.input.toLocaleString()}</p>
          </div>
        )}
        {cost.output !== undefined && (
          <div>
            <p className="text-muted-foreground text-xs">Output tokens</p>
            <p className="font-semibold">{cost.output.toLocaleString()}</p>
          </div>
        )}
        {cost.cost_usd !== undefined && (
          <div>
            <p className="text-muted-foreground text-xs">Estimated cost</p>
            <p className="font-semibold">${cost.cost_usd.toFixed(4)}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

const DemoGraphify = () => {
  const [report, setReport] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [graph, setGraph] = useState<GraphJson | null>(null);
  const [cost, setCost] = useState<Cost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      tryFetch<string>(`${ARTIFACT_ROOT}GRAPH_REPORT.md`, "text").then(setReport),
      tryFetch<Analysis>(`${ARTIFACT_ROOT}.graphify_analysis.json`, "json").then(setAnalysis),
      tryFetch<GraphJson>(`${ARTIFACT_ROOT}graph.json`, "json").then(setGraph),
      tryFetch<Cost>(`${ARTIFACT_ROOT}cost.json`, "json").then(setCost),
    ]).finally(() => setLoading(false));
  }, []);

  const hasAny = report || analysis || graph || cost;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading mb-4">
            <Network className="h-3.5 w-3.5" /> Internal Demo
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Graphify</h1>
          <p className="text-muted-foreground">
            A codebase intelligence tool that extracts symbol graphs, clusters communities, identifies
            high-risk nodes, and surfaces surprising cross-cutting dependencies. The artifacts below
            were generated by running graphify against a real repository.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center text-muted-foreground py-20 text-sm">Loading artifacts…</div>
        )}

        {!loading && !hasAny && (
          <Card className="text-center py-12">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No artifacts yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Run graphify and copy the output files into{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">public/demo/graphify/</code>
            </p>
          </Card>
        )}

        {!loading && hasAny && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {graph && <GraphStats graph={graph} />}
            {analysis && <AnalysisSection analysis={analysis} />}
            {cost && <CostCard cost={cost} />}
            {report && (
              <Card>
                <SectionTitle icon={FileText} title="Full Report" />
                <div className="prose prose-sm dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border
                  prose-table:text-sm prose-th:text-foreground prose-td:text-muted-foreground
                  prose-strong:text-foreground prose-li:text-muted-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
                </div>
              </Card>
            )}
          </motion.div>
        )}
    </div>
  );
};

export default DemoGraphify;
