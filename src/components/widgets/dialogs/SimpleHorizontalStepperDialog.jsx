import React from 'react';
import {
    Box,
    Button,
    Step,
    StepButton,
    Stepper,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ConfirmationModalDialog from './ConfirmationModalDialog';

const SimpleHorizontalStepperDialog = (props) => {

    const theme = useTheme();

    const [steps, setSteps] = React.useState(props.steps);
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    React.useEffect(()=>{
        setSteps(props.steps);
    }, [props.steps]);

    const totalSteps = () => {
        return steps.length;
    }

    const completedSteps = () => {
        return Object.keys(completed).length;
    }

    const isLastStep = () => {
        return activeStep === totalSteps()-1;
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
            ?   // It's the last step, but not all steps have been completed, find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : 
            activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ props.onClose }
            onCancel={ props.onCancel }
            onConfirm={ props.onConfirm }
            title={ props.title }
            confirmation={ props.confirmation }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Stepper nonLiner activeStep={ activeStep }>
                    {
                        steps.map((step,index)=>(
                        <Step key={ step.label } completed={ completed[index] }>
                            <StepButton 
                                color="inherit" 
                                onClick={ handleStep(index) }
                                // icon={<div style={{backgroundColor: 'orange', width:'11px', padding: '2px', textAlign: 'center', height: '11px', fontSize: '10px', borderRadius: '50%'}}>{index}</div>}
                                // sx={{ "& .MuiStepIcon-root": { color: 'red' }}}
                                sx={{ "& .Mui-active": { color: theme.palette.success.main }}}
                            >
                                { step.label }
                            </StepButton>
                        </Step>
                        ))
                    }
                    </Stepper>
                </Box>
                <Box sx={{ mt: 4 }}>
                    {
                    allStepsCompleted() ? (
                    <Box>
                        <Box sx={{ height: props.height }}>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </Box>
                    ) : (
                    <Box>
                        <Box sx={{ height: props.height, overflow: 'auto' }}>
                            { steps[activeStep].step }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                            <Button
                                color="inherit"
                                disabled={ activeStep===0 }
                                onClick={ handleBack }
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={ handleNext } sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {
                            activeStep !== steps.length &&
                            (completed[activeStep] ? (
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                Step {activeStep + 1} already completed
                            </Typography>
                            ) : (
                            <Button onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Complete Step'}
                            </Button>
                            ))}
                        </Box>
                    </Box>
                    )
                    }
                </Box>
            </Box>
        </ConfirmationModalDialog>
    )
}

export default SimpleHorizontalStepperDialog;