import React from 'react';
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
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Draggable from 'react-draggable';
// import { ResizableBox } from 'react-resizable';
import { Resizable } from 're-resizable';

// import './example.css';

const LongTextCommonDialog = (props) => {

    const {
        id, 
        seq,
        editMode,
        title, 
        kind,
        isOpen, 
        onCancel, 
        onConfirm,
    } = props;

    const [focused, setFocused] = React.useState(false);
    const [text, setText] = React.useState("");
    const [size, setSize] = React.useState({
        width: 700,
        height: 430
    })

    React.useEffect(()=>{
        if(props.text===undefined) return;
        setText(props.text);
    }, [props.text]);

    if(!isOpen) {
        return null;
    }

    function PaperComponent(obj, props) {
        const nodeRef = React.useRef(null);
         return (
            <Draggable
                handle={ "#draggable-long-text-dialog-title-"+seq }
                cancel={'[class*="MuiDialogContent-root"]'}
                nodeRef={nodeRef}
            >
                <Paper {...obj} ref={nodeRef}/>
            </Draggable>
        );
    }

    const handleResizeStop = (e, direction, ref, d) => {
        setSize({
            width: size.width+d.width,
            height: size.height+d.height
        })
    }

    return (
        <Dialog
            maxWidth="lg"
            open={ isOpen }
            PaperComponent={ PaperComponent }
            aria-labelledby={ "draggable-long-text-dialog-title-"+seq }
            keepMounted
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DialogTitle style={{ cursor: 'move' }} id={ "draggable-long-text-dialog-title-"+seq }>{ title }</DialogTitle>
                <IconButton aria-label="close" onClick={ onCancel } >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <Resizable 
                size={{ width: size.width, height: size.height }} 
                onResizeStop={ handleResizeStop }
                style={{
                    display: 'flex',
                    overflow: "hidden hidden",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                handleComponent={{
                    // bottomRight: <BottomRightHandle />,
                }}
                bounds="window"
            >
                <DialogContent 
                    sx={{ 
                        m:0, 
                        p:0, 
                        display: "flex", 
                        justifyContent: "center", 
                        width: size.width, 
                        height: size.height 
                    }}>
                    <TextField
                        fullWidth
                        sx={{ 
                            p:0, 
                            m:1.2, 
                            fontSize: 14 
                        }}
                        value={ text }
                        id="long-text-input-text-required"
                        InputProps={{ 
                            sx: { 
                                fontSize: 14, 
                                "& fieldset": { border: focused ? 'solid 1px black': 'none' } 
                            }, 
                        }}
                        onChange={ e=>setText(e.target.value) }
                        placeholder='Type text here'
                        size="small"
                        multiline
                        minRows={ 3 }
                        disabled={ !editMode }
                        onFocus={ ()=>setFocused(true) }
                        onBlur={ ()=>setFocused(false) }
                    />
                </DialogContent>
             </Resizable>
            <Divider />
            <DialogActions>
                <Button onClick={ onCancel } color="inherit">
                    <Typography sx={{ fontSize: 14 }}>Cancel</Typography>
                </Button>
                {
                    onConfirm&&
                <Button onClick={ ()=>onConfirm(id, text, kind) } color="inherit">
                    <Typography sx={{ fontSize: 14 }}>Confirm</Typography>
                </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default LongTextCommonDialog;