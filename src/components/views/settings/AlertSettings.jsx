import React from 'react';

import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    TextField,
    Typography
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { getImessageBroker } from '../../../utils/InternalMessageBroker';

var initValues = {
    disappearAutomatically: true,
    seconds: -1
}

const AlertSettings = (props) => {

    const [values, setValues] = React.useState(initValues);

    React.useEffect(()=>{
        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            const temp=localStorage.getItem("settings.alert");
            if(temp!==null) {
                initValues=JSON.parse(temp);
            }
        }
        setValues(initValues);
        dispatch(initValues.disappearAutomatically, initValues.seconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const messageBroker = React.useMemo(()=>{
        return getImessageBroker();
    }, []);

    const handleOnCheckClick = (e) => {
        setValues({
            ...values,
            disappearAutomatically: e.target.checked
        });
    }

    const handleOnCancel = () => {
        setValues(initValues);
    }

    const dispatch = (disappearAutomatically, seconds)=> {
        messageBroker.dispatch({
            kind: "ALERT_SETTINGS",
            settings: {
                disappearAutomatically: disappearAutomatically,
                seconds: seconds
            }
        });
    }

    const handleOnAlertSettingsChange = () => {
        initValues=values;
        dispatch(values.disappearAutomatically,values.seconds);

        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            localStorage.setItem("settings.alert", JSON.stringify(values));
        }
    }

    return (
        <Box width="550px" sx={{ mt: 3, ml: 1 }}>
            <Box>
                <Typography fontSize={ 16 }>Alert</Typography>
                <Typography fontSize={ 11 }>In case of no-modal alert</Typography>
            </Box>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-bewteen", alignItems: "center" }}>
                <Box sx={{ minWidth: 320, display: "flex", alignItems: "center" }}>
                    <div>
                        <FormControlLabel 
                            control={<Switch size="small" checked={ values ? values.disappearAutomatically : false } />} 
                            label={ <Typography sx={{ fontSize: 14 }}>Disappear </Typography>} 
                            onClick={ handleOnCheckClick }
                        />
                    </div>
                    <div style={{ display: values.disappearAutomatically===true?"flex":"none", alignItems: "center" }}>
                        <TextField
                            sx={{ width: '9ch', ml: 1,mb: 2.5 }}
                            id="alert-disappear-latency-text-field-outlined"
                            label="Seconds"
                            InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                            InputProps={{ sx: { fontSize: 14 }}}
                            value={ values ? values.seconds  : "" }
                            onChange={ (e)=>setValues({ ...values, seconds: e.target.value })}
                            size='small'
                            variant='standard'
                        />
                        <Typography sx={{ ml: 2, fontSize: 14 }}>Seconds later</Typography>
                    </div>
                </Box>
                <Box 
                    sx={{ 
                        ml: 2,
                        mt: 1,
                        mb: 2.5,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}
                >
                    <Button
                        startIcon={ <CancelIcon />}
                        variant='contained'
                        color='inherit'
                        fontSize='14'
                        sx={{ ml: 1, width: 100, height: "35px", }}
                        onClick={ handleOnCancel }
                    >
                        <Typography fontSize={ 12 }>Cancel</Typography>
                    </Button>
                    <Button
                        startIcon={ <CheckCircleIcon />}
                        variant='contained'
                        color='inherit'
                        size='small'
                        sx={{ m:0, p:0, ml: 1, width: 100, height: "35px", bgcolor: "secondary.light", color: "info.contrastText" }}
                        onClick={ handleOnAlertSettingsChange }
                    >
                        <Typography fontSize={ 12 }>OK</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AlertSettings;