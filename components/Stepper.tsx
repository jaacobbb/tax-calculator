interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 py-4 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}

