import { motion } from "framer-motion";
import { Check, Clock, Upload, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const KYCProgressBar = () => {
  const { user } = useAuth();

  const steps = [
    {
      id: 1,
      title: "Email Verified",
      completed: Boolean(user?.emailVerified),
      icon: Check,
    },
    {
      id: 2,
      title: "Profile Completed",
      completed: Boolean(user?.profileCompleted),
      icon: Clock,
    },
    {
      id: 3,
      title: "Documents Uploaded",
      completed: Boolean(user?.documentsUploaded),
      icon: Upload,
    },
    {
      id: 4,
      title: "KYC Approved",
      completed: user?.kycStatus === "approved",
      icon: Shield,
    },
  ];

  const completedSteps = steps.filter((step) => step.completed === true).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          KYC Progress
        </h3>
        <span className="text-sm text-muted-foreground">
          {completedSteps}/{steps.length} Complete
        </span>
      </div>

      <Progress value={progressPercentage} className="mb-6" />

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              step.completed
                ? "bg-accent/10 border border-accent/20"
                : "bg-muted/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <step.icon className="w-4 h-4" />
            </div>
            <span
              className={`font-medium ${
                step.completed ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
            {step.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-5 h-5 bg-accent rounded-full flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-accent-foreground" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KYCProgressBar;
