import React from 'react';

import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import AirplayIcon from '@mui/icons-material/Airplay';

const InterfsSvcTestResponseView = (props) => {

    const [responseJson, setResponseJson] = React.useState("");

    React.useEffect(()=>{
        if(props.response===undefined) return;
        const json=JSON.stringify(props.response, null, 4);
        setResponseJson(json);
    }, [props.response]);

    return (
        <Box sx={{ width: "50%", mt: 2, p: 1, pr: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography 
                    fontSize={ 14 } 
                    sx={{ cursor: "pointer" }} 
                    onClick={ ()=>props.onRetrievalInterfaceSelected(undefined, props.interfsName) }
                >
                    { "응답 데이터 ( " + (props.interfsName) + " )"}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                <TextField
                    fullWidth
                    size='small'
                    id="reply-interfs-name-text-required"
                    label="Reply interface name"
                    value={ props.interfsName }
                    InputLabelProps={{ 
                        sx: { fontSize: 14 }, 
                        shrink: true 
                    }}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <Button 
                                    size='small' 
                                    color="inherit" 
                                    startIcon={ <AirplayIcon />}
                                    onClick={ ()=>props.onRetrievalInterfaceSelected(undefined, props.interfsName) }
                                >
                                    Details
                                </Button>
                            </InputAdornment>
                    }}
                    sx={{
                        mt: 1
                    }}
                    disabled
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <TextField
                    fullWidth
                    sx={{ 
                        p:0, 
                        mt:1, 
                        minWidth: '30ch',
                        "& .MuiInputBase-input": {
                            whiteSpace: "nowrap",
                            overflow: "auto",
                        }
                    }}
                    id="ifsvc-request-input-text-required"
                    label="Response data as JSON format"
                    value={ responseJson }
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ 
                        sx: { 
                            fontSize: 14, 
                            padding: 1,
                            color: "warning.main.constastText"
                        }, 
                    }}
                    size="small"
                    multiline
                    minRows={ 20 }
                    // disabled
                />
                {/* <Typography variant="body1" gutterBottom noWrap={ true }>
                    <pre><code>{ responseJson }</code></pre>
                </Typography> */}
            </Box>
        </Box>
    )
}

export default InterfsSvcTestResponseView;