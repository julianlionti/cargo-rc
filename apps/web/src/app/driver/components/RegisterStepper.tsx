import { Step, StepLabel, Stepper } from "@mui/material";

interface RegisterStepperProps {
  activeStep: number;
}

export const registerSteps = [
  "Basic Details",
  "Driver Details",
  "Preferences",
  "Additional Information",
];

export default function RegisterStepper({ activeStep }: RegisterStepperProps) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {registerSteps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
