import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const CORRECT = "3355";
const SESSION_KEY = "demo_pin_ok";

interface PinGateProps {
  children: React.ReactNode;
}

const PinGate = ({ children }: PinGateProps) => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (val: string) => {
    setValue(val);
    setError(false);
    if (val.length === 4) {
      if (val === CORRECT) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => { setValue(""); setError(false); }, 700);
      }
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Access Required</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter PIN to view this demo</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <InputOTP maxLength={4} value={value} onChange={handleChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={1} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={2} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={3} className={error ? "border-destructive text-destructive" : ""} />
            </InputOTPGroup>
          </InputOTP>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-destructive"
              >
                Incorrect PIN
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PinGate;
