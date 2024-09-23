import React from 'react';
import { 
    Alert,
    AlertTitle,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Paper,
    Tooltip,
    Typography
} from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

import Draggable from 'react-draggable';

function PaperComponent(props) {

    const nodeRef = React.useRef(null);
    
    return (
        <Draggable
            handle="#draggable-alert-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
        >
            <Paper {...props} ref={nodeRef}/>
        </Draggable>
    );
}

export const DecoratedAlert = ( props ) => {

    const { idx, title, message, severity, isOpen, isModal, onClose, onCloseAll, position, width } = props;

    if(!isOpen) {
        return null;
    }

    if(isModal===true) {
        const icon = 
              severity==="alert" ? <NotificationImportantIcon /> 
            : severity==="success" ? <DoneIcon />
            : severity==="info" ? <InfoIcon />
            : severity==="warning" ? <WarningIcon />
            : <ErrorIcon />;
        return (
            <Dialog 
                fullWidth 
                onClose={ ()=> onClose() } 
                open={ isOpen } 
                PaperComponent={ PaperComponent }
                aria-labelledby="draggable-alert-dialog-title"
                keepMounted
            >
                {
                    title!==undefined && title!=="" && 
                    <>
                <DialogTitle sx={{ cursor: "move" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        { icon }
                        <Typography sx={{ ml: 2 }} variant='h6'>{ title }</Typography>
                    </Box>
                </DialogTitle>
                <Divider />
                </>
                }
                <DialogContent>
                    <Tooltip title={ message }>
                    <Typography 
                            gutterBottom paragraph
                            sx={{ 
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                                fontSize: 15, 
                                overflow: "hidden", 
                                textOverflow: "ellipsis" ,
                            }}
                        >
                            { message }
                        </Typography>
                    </Tooltip>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={ (e)=>onClose(e, idx) }>Close</Button>
                </DialogActions>
            </Dialog>
        )
    } else {
        return (
            <Alert severity={ severity } onClose={ (e)=>onClose(e, idx) } sx={{ position: 'absolute', right: position.right, top: position.top, width: width, zIndex: 100 }}>
            {
                title && title !== "" &&
                <AlertTitle sx={{ width: "490px" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography fontSize={ 16 }>{ title }</Typography>
                        <Chip 
                            label="Remove All"
                            icon={ <ClearAllIcon fontSize='small'/>}
                            size='small'
                            sx={{ fontSize: 12, m:0, p: 0 }}
                            onClick={ ()=>onCloseAll() }
                        />
                    </Box>
                </AlertTitle>
            }
                <Tooltip title={ message }>
                    <Typography fontSize={ 14 } noWrap>{ message }</Typography>
                </Tooltip>
            </Alert>
        )
    }
}