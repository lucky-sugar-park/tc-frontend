import React from 'react';
import Draggable from 'react-draggable';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Paper,
    Typography
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmModalDialog = (props) => {

    const { id, seq, title, message, buttons: { ok, close, cancel }, isOpen } = props;

    if(!isOpen) {
        return null;
    }

    function PaperComponent (props) {
        const nodeRef = React.useRef(null);

        return (
            <Draggable
                handle={ "#draggable-confirm-alert-dialog-title-"+seq}
                cancel={ '[class*="MuiDialogContent-root"]' }
                nodeRef={ nodeRef }
            >
                <Paper { ...props } ref={ nodeRef }/>
            </Draggable>
        );
    }

    return (
        <Dialog
            maxWidth="lg"
            open={ true }
            onClose={ close.click }
            PaperComponent={ PaperComponent }
            aria-labelledby={ "draggable-confirm-alert-dialog-title-"+seq }
            keepMounted
        >
            <DialogTitle style={{ cursor: "move" }} id={ "draggable-confirm-alert-dialog-title-"+seq }>
                <Box sx={{ minWidth: "400px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={ 18 }>{ title }</Typography>
                    <IconButton onClick={ close.click } sx={{ fontSize: 14 }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>{ message }</DialogContent>
            {/* <Divider /> */}
            <DialogActions>
                <Button 
                    autoFocus 
                    onClick={ ok.click } 
                    startIcon={ <CheckIcon /> }
                    color="inherit"
                    size='small'
                    variant='contained'
                >
                    <Typography fontSize={ 14 }>{ ok.text }</Typography>
                </Button>
                {cancel&&
                <Button 
                    onClick={ cancel.click } 
                    startIcon={ <CancelIcon /> }
                    color="inherit"
                    size='small'
                    variant='contained'
                >
                    <Typography fontSize={ 14 }>{ cancel.text }</Typography>
                </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmModalDialog;