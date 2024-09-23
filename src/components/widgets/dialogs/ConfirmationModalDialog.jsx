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

import { 
    Close as CloseIcon 
} from '@mui/icons-material';

function PaperComponent(props) {

    const nodeRef = React.useRef(null);
    
    return (
        <Draggable
            handle="#draggable-confirmation-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
        >
            <Paper {...props} ref={nodeRef}/>
        </Draggable>
    );
}
  

const ConfirmationModalDialog = (props) => {
    const { 
        title, 
        children, 
        open, 
        setOpen, 
        onCancel, 
        onConfirm, 
        confirmation, 
        titleDivider, 
        actionDivider 
    } = props;

    return (
        <Dialog
            maxWidth="lg"
            open={open}
            onClose={ !confirmation ? ()=>setOpen(false): console.log() }
            PaperComponent={ PaperComponent }
            aria-labelledby="draggable-confirmation-dialog-title"
            keepMounted
        >
            <DialogTitle style={{ cursor: "move" }} id="draggable-confirmation-dialog-title">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography>{title}</Typography>
                    <IconButton onClick={ onCancel }>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </Box>
            </DialogTitle>
            { titleDivider ? <Divider /> : "" }
            <DialogContent>{children}</DialogContent>
            { actionDivider ? <Divider /> : "" }
            <DialogActions>
                <Button autoFocus onClick={onCancel} color="inherit">{ confirmation?"Cancel":"Close"}</Button>
                {
                    confirmation ?
                    <Button onClick={onConfirm} color="inherit">Confirm</Button>
                    :
                    ""
                }
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModalDialog;