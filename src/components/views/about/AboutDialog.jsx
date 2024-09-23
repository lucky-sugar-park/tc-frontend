import React from 'react';

import { 
    Box,
    Typography 
} from '@mui/material';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import logo from '../../../assets/images/logo.png';

const AboutDialog = (props) => {

    const handleClose = () => {
        props.onClose();
    }

    const handleConfirm = () => {
        props.onClose();
    }

    return (
        <ConfirmationModalDialog
            open={props.open}
            onClose={handleClose}
            onCancel={handleClose}
            onConfirm={handleConfirm}
            title="About Tool Control System"
            setOpen={handleClose}
            titleDivider
            actionDivider
        >
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-start", alignItems: "center" }}>
                    <Box>
                        <img src={ logo } alt='Tool Control' width="76" />
                    </Box>
                    <Box sx={{ ml: 1.5 }}>
                        <Typography sx={{ fontSize: 16 }} gutterBottom>
                            Tool Control System is for intermediation between lagacy system and PLC <br/>
                            (Programmable Logic Controller) system.<br/>
                            Legacy systems like MES, can request read or write command to PLC via <br/>
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography gutterBottom>
                        this Tool Control System using Json data format which is familized with most of developers.<br/>
                        You can save your time and cost for MES using this product when you delivery system like MES.<br/>
                        Despite it's version is initial, it would be progressed continuously in the near future.
                        <br/><br/>
                    </Typography>
                    <Typography gutterBottom>
                        Version: TC-v1.0.0
                    </Typography>
                    <Typography gutterBottom>
                        Since&nbsp;: 2024-10-15<br/>
                        Developer&nbsp;: lucky.sugar.park@gmail.com<br/>
                        Contact&nbsp;: +82-10-2376-8208            
                    </Typography>
                </Box>
            </Box>
        </ConfirmationModalDialog>
    )
}

export default AboutDialog;