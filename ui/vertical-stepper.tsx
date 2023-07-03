import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function VerticalLinearStepper({
  steps,
  lastStepCaption,
  CompletedMessage,
}: {
  steps: {
    label: string,
    description: string,
  }[],
  lastStepCaption: string,
  CompletedMessage: string,
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      className='text-white'
      sx={{ maxWidth: 400 }}>
      <Stepper
        className='text-white'
        activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            className='text-white'
            key={step.label}>
            <StepLabel
              className='text-white'
              optional={
                index === 2 ? (
                  <Typography variant="caption">{lastStepCaption}</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography className='text-white'>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Selesai' : 'Selanjutnya'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Kembali
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>{CompletedMessage}</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Ulangi
          </Button>
        </Paper>
      )}
    </Box>
  );
}