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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Draggable from 'react-draggable';
// import { ResizableBox } from 'react-resizable';
import { Resizable } from 're-resizable';

// import './example.css';

function PaperComponent(obj, props) {
    const nodeRef = React.useRef(null);
     return (
        <Draggable
            handle={ "#draggable-long-text-dialog-title" }
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
        >
            <Paper {...obj} ref={nodeRef}/>
        </Draggable>
    );
}

const LongTextDialog = (props) => {

    const { 
        editMode,
        title, 
        open, 
        onCancel, 
        onConfirm,
    } = props;

    const [focused, setFocused] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [size, setSize] = React.useState({
        width: 700,
        height: 430
    })

    React.useEffect(()=>{
        if(props.value===undefined) return;
        setValue(props.value);
    }, [props.value]);

    const handleResizeStop = (e, direction, ref, d) => {
        setSize({
            width: size.width+d.width,
            height: size.height+d.height
        })
    }

    return (
        <Dialog
            maxWidth="lg"
            open={ open }
            PaperComponent={ PaperComponent }
            aria-labelledby={ "draggable-long-text-dialog-title" }
            keepMounted
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DialogTitle style={{ cursor: 'move' }} id={ "draggable-long-text-dialog-title" }>{ title }</DialogTitle>
                <IconButton aria-label="close" onClick={ onCancel } >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            {/* <ResizableBox 
                width={ size.width } 
                height={ size.height } 
                // draggableOpts={{grid: [25, 25]}} 
                // className="box"
                // minConstraints={[700, 250]} 
                maxConstraints={[900, 500]}
                onResize={ handleResize }
                resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
                handle={(h, ref) => <div className={`custom-handle custom-handle-${h}`} ref={ref} />}
                handleSize={ [24,24]}
                style={{
                    position: 'relative',
                    overflow: 'hidden hidden',
                    // display: 'flex',
                    // padding: '0px',
                    // boxSizing: 'border-box',
                    '& .react-resizable-handle': {
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        bottom: 0,
                        right: 0,
                        background:"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+')",
                        'background-position': 'bottom right',
                        padding: '0 3px 3px 0',
                        'background-repeat': 'no-repeat',
                        'background-origin': 'content-box',
                        'box-sizing': 'border-box',
                        cursor: 'se-resize',
                    }
                }}
            > */}
            <Resizable 
                size={{ width: size.width, height: size.height }} 
                onResizeStop={ handleResizeStop }
                style={{
                    display: 'flex',
                    overflow: "hidden hidden",
                    alignItems: "center",
                    justifyContent: "center",
                //     // border: "solid 1px #ddd",
                //     // background: "#f0f0f0"
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
                        value={ value }
                        id="long-text-input-text-required"
                        InputProps={{ 
                            sx: { 
                                fontSize: 14, 
                                "& fieldset": { border: focused ? 'solid 1px black': 'none' } 
                            }, 
                        }}
                        onChange={ e=>setValue(e.target.value) }
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
                <Button onClick={ onCancel } color="inherit">Cancel</Button>
                {
                    onConfirm&&
                    <Button onClick={ ()=>onConfirm(value) } color="inherit">Confirm</Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default LongTextDialog;