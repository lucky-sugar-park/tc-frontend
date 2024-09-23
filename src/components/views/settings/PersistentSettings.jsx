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

const PersistentSettings = (props) => {

    const [origPersistent, setOrigPersistent] = React.useState(false);
    const [persistent, setPersistent] = React.useState(false);

    React.useEffect(()=>{
        const persist=localStorage.getItem("settings.saveToStorage");
        setPersistent(persist===null || persist===undefined || persist==="false"?false:persist);
        setOrigPersistent(persist===undefined?false:persist);
    }, []);

    const handleOnCheckClick = (e) => {
        setPersistent(e.target.checked);
    }

    const handleOnCancel = () => {
        setPersistent(origPersistent);
    }

    const handleOnPersistentSettingsChange = () => {
        setOrigPersistent(persistent);
        localStorage.setItem("settings.saveToStorage", persistent);
    }

    return (
        <Box width="550px" sx={{ mt: 3, ml: 1 }}>
            <Box>
                <Typography fontSize={ 16 }>Saving Setting To</Typography>
            </Box>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-bewteen", alignItems: "center" }}>
                <Box sx={{ minWidth: 320, display: "flex", alignItems: "center" }}>
                    <div>
                        <FormControlLabel 
                            control={<Switch size="small" checked={ persistent==="true" ? true : false } />} 
                            label={ <Typography sx={{ fontSize: 14 }}>Save settings to localStorage</Typography>} 
                            onClick={ handleOnCheckClick }
                        />
                        <Typography fontSize={ 9 } sx={{ ml: 3.7 }}>( Above settings would be disappeared if no set to true )</Typography>
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
                        onClick={ handleOnPersistentSettingsChange }
                    >
                        <Typography fontSize={ 12 }>OK</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default PersistentSettings;