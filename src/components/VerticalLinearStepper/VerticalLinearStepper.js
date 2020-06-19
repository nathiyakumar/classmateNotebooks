import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';
import './VerticalLinearStepper.css';




const useStyles = makeStyles(theme => ({
    vertical_stepper_section: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    iconContainer: { // define styles for icon container
        zIndex: 0
    }
}));

function getSteps() {
    return ['Choose Page', 'Choose Size', 'Choose Ruling', 'Choose Binding', 'Choose Quantity', 'Choose Design', 'Place Order'];
}



export default function VerticalLinearStepper(currentActiveStep) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(parseInt(currentActiveStep.current_active_step));
    const steps = getSteps();

    const useColorlibStepIconStyles = makeStyles({
        root: {
            backgroundColor: '#fff',
            zIndex: 1,
            color: '#fff',
            width: 30,
            height: 30,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            border:'2px solid #ccc'
        },
        rootActive: {
            backgroundColor:'#fff',
            border:'2px solid #FF6733'
        },
        rootCompleted: {
            backgroundColor:'#fff',
            border:'2px solid #46C267'
        },
        round:{
            width: '20px',
            height: '20px',
            borderRadius:'50%',
            backgroundColor: '#ccc',
        },
        roundActive:{
            backgroundColor:'#FF6733'
        },
        roundCompleted:{
            backgroundColor:'#46C267'
        }

    });

    function ColorlibStepIcon(props) {
        const classes = useColorlibStepIconStyles();
        const { active, completed } = props;

        return (
            <div
                className={clsx(classes.root, { [classes.rootActive]: active, [classes.rootCompleted]: completed, })}
            >
                <div className={clsx(classes.round, { [classes.roundActive]: active, [classes.roundCompleted]: completed, })}>

                </div>
            </div>
        );
    }
    return (
        <div className="desktop_vertical_linear_section">
            <div className={classes.vertical_stepper_section}>
                <Stepper  activeStep={activeStep}   orientation="vertical" >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon} classes={{ // apply this style
                                iconContainer: classes.iconContainer
                            }} >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>

    );
}
