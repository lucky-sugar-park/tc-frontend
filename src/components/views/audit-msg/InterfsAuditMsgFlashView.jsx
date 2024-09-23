import React from 'react';
import {
    Box,
    Button,
    Divider,
    Typography
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { deleteAuditsByTimestamp } from './AuditMessageApi';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

var cnt=0;
const InterfsAuditMsgFlashView = (props) => {

    const { Notifier } = React.useContext(AlertContext);
    const [dateTime, setDateTime] = React.useState(undefined);

    const handleFlash = () => {
        if(dateTime===undefined) return;
        deleteAuditsByTimestamp(dateTime, (response, error)=>{
            const m=cnt++%3;
            if(m===0) {
                Notifier.info({ title: "TEST", message: "Deleted " + response.deletedCount + " rows", modal: true});
                // Notifier.alert("Deleted " + response.deletedCount + " rows");
            } else if(m===1) {
                Notifier.error({ title: "TEST", message: "Deleted " + response.deletedCount + " rows", modal: false});
            } else {
                Notifier.alert("Deleted " + response.deletedCount + " rows");
            }
        });
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DateTimePicker 
                    // label="Audit message flash date time picker"
                    value={ dateTime }
                    onChange={ (newDateTime) => setDateTime(newDateTime) }
                />
            </LocalizationProvider>
            <Divider sx={{ ml: 2 }} />
            <Typography fontSize={ 14 }>이전 Audit Message</Typography>
            <Divider sx={{ ml: 2 }} />
            <Button
                startIcon={  <DeleteForeverIcon /> }
                fontSize="16px"
                variant='contained'
                color='primary'
                onClick={ handleFlash }
            >
                <Typography fontSize={ 18 }>삭제</Typography>
            </Button>
        </Box>
    )
}

export default InterfsAuditMsgFlashView;