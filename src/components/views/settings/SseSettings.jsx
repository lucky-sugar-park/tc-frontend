import React from 'react';

import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    Typography
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { getImessageBroker } from '../../../utils/InternalMessageBroker';

var initValues = {
    receiveSse: false
}

const SseSettings = (props) => {

    const [values, setValues] = React.useState(initValues);

    React.useEffect(()=>{
        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            const temp=localStorage.getItem("settings.sse");
            if(temp!==null) {
                initValues=JSON.parse(temp);
            }
        }
        setValues(initValues);
        dispatch(initValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch = (values) => {
        messageBroker.dispatch({
            kind: "SSE_SETTINGS",
            settings: values
        });
    }

    const messageBroker = React.useMemo(()=>{
        return getImessageBroker();
    }, []);

    const handleOnCancel = () => {
        setValues(initValues)
    }

    const handleOnCheckClick = (e) => {
        setValues({
            ...values,
            receiveSse: e.target.checked
        });
    }

    const handleOnSseSettingsChange = () => {
        initValues=values;
        dispatch(values);
        const persist=localStorage.getItem("settings.saveToStorage");
        if(persist==="true") {
            localStorage.setItem("settings.sse", JSON.stringify(values));
        }
    }

    return (
        <Box width="550px" sx={{ mt: 3, ml: 1 }}>
            <Box>
                <Typography fontSize={ 16 }>Server Side Event</Typography>
            </Box>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-bewteen", alignItems: "center" }}>
                <Box sx={{ minWidth: 320, display: "flex", alignItems: "center" }}>
                    <div>
                        <FormControlLabel 
                            control={<Switch size="small" checked={ values ? values.receiveSse : false } />} 
                            label={ <Typography sx={{ fontSize: 14 }}>Receive server side event </Typography>} 
                            onClick={ handleOnCheckClick }
                        />
                        <Typography fontSize={ 9 } sx={{ ml: 3.7 }}>( TO-OD: Sse filter settings should be added at later )</Typography>
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
                        onClick={ handleOnSseSettingsChange }
                    >
                        <Typography fontSize={ 12 }>OK</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default SseSettings;