import { Progress } from "@radix-ui/react-progress";

export function ProgressBar({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
        <span className="text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Personal Info</span>
        <span>Summary</span>
        <span>Relevant Course Work</span>
        <span>Skills & Expertise</span>
        <span>Professional Associations</span>
        <span>Certifications</span>
      </div>
    </div>
  );
}