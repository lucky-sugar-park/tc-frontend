import React from 'react';

import { 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableFooter,
    TableHead, 
    TablePagination, 
    TableRow, 
    Typography, 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { clearAllVirtualPlcMemory, readVirtualPlcMemory, writeVirtualPlcMemory } from './VplcApi';
import VplcMemoryRow from './VplcMemoryRow';

function makeEmptyMemoryBlock () {
    const rows=[];
    for(var i=0;i<20;i++) {
        rows.push({
            address: "D"+i,
            bitValues: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            highVal: "",
            lowVal: "",
            allVal: "",
            asciiVal: ""
        });
    }
    return rows;
}

function numberTo16BitArray(number) {
    const strBit=(number>>>0).toString(2);
    const arr=[];
    var i=0;
    for(i=0;i<16-strBit.length;i++) arr.push(0);
    for(i=0;i<strBit.length;i++) arr.push(strBit[i]);
    return arr;
}

const VplcMemoryView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [memInfo, setMemInfo] = React.useState({
        page: 0,
        wordsPerPage: 20,
        memType: "",
        frameFormat: "BINARY",
        capacity: 20000,
        startAddress: 0,

    });
    const [rows, setRows] = React.useState([]);

    React.useEffect(()=>{
        setRows(makeEmptyMemoryBlock());
    },[]);

    React.useEffect(()=>{
        if(props.command===undefined) return;
        handleOnCommand(props.command);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.command]);

    const handleOnResponse = (memInfo, error, command) => {
        if(error===undefined) {
            Notifier.info({
                title: "Memory operation success",
                message: "Success to execute memory operation. [" + JSON.stringify(command) + "]",
                modal: false
            });
            const nrows=[];
            memInfo.wordInfos.forEach((wInfo,index)=>{
                nrows.push({
                    address: command.memoryType+(memInfo.startAddress+index),
                    bitValues: numberTo16BitArray(wInfo.word),
                    highVal: wInfo.high,
                    lowVal: wInfo.low,
                    allVal: wInfo.word,
                    asciiVal: wInfo.hlStr
                });
            });
            setRows(nrows);
        } else {
            Notifier.warn({
                title: "Memory operation failed",
                message: "Fail to execute memory operation with cause [" + error + "], command: " + JSON.stringify(command),
                modal: true
            });
        }
    }

    const handleOnCommand = (command) => {
        const request = { 
            vplcId: command.vplcId,
            vplcName: command.vplcName,
            memoryType: command.memoryType,
            frameFormat: command.frameFormat,
            startAddress: command.startAddress,
            wordCount: command.wordCount
        };
        if(command.type==="READ") {
            readVirtualPlcMemory(request, (resp, error)=>handleOnResponse(resp, error, command));
        } else if(command.type==="WRITE") {
            request.data=command.data;
            writeVirtualPlcMemory(request, (resp, error)=>handleOnResponse(resp, error, command));
        } else if(command.type==="CLEAR-ALL") {
            clearAllVirtualPlcMemory(command, ((resp, error)=>handleOnResponse(resp, error, command)));
        }

        setMemInfo({
            ...memInfo,
            startAddress: command.startAddress,
            memType: command.memoryType,
            frameFormat: command.frameFormat,
            page: (parseInt(command.startAddress)/parseInt(memInfo.wordsPerPage))
        })
    }

    const handleOnPageChange = (event, newPage) => {
        setMemInfo({
            ...memInfo,
            page: newPage
        });

        handleOnCommand({
            type: "READ",
            vplcId: props.vplcId,
            vplcName: props.vplcName,
            memoryType: memInfo.memType,
            frameFormat: memInfo.frameFormat,
            startAddress: (newPage)*parseInt(memInfo.wordsPerPage),
            wordCount: memInfo.wordsPerPage
        });
    }

    const handleOnWordsPerChange = (event) => {
        setMemInfo({
            ...memInfo,
            wordsPerPage: parseInt(event.target.value),
            page: 0
        });
    }

    return (
        <Box sx={{ width: "100%", height: "100%", ml: 0, mr: 2, mt: 1.5 }}>
            <TableContainer sx={{ width: "100%", height:"100%", overflow: 'auto' }} component={ Box }>
                <Table sx={{ }} size='small' aria-label='caption table' stickyHeader>
                    {/* <caption style={{ captionSide: "top" }}>
                        <Typography fontSize={ 14 }>Current Memory Value</Typography>
                    </caption> */}
                    <TableHead
                        style={{
                            backgroundColor: theme.palette.background.tableHead, 
                            // position: "sticky", 
                            // top: 0, 
                            // zIndex: 1
                        }}
                    >
                        <TableRow sx={{ border: 1, backgroundColor: theme.plc.table.header.backgroundColor }}>
                            <TableCell sx={{ border: 1 }} size='small'>&nbsp;</TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>ADDR</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>15</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>14</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>13</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>12</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>11</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>10</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>09</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>08</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>07</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>06</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>05</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>04</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>03</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>02</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>01</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>00</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>HIGH</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>LOW</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>ALL</Typography></TableCell>
                            <TableCell sx={{ border: 1 }} size='small' align="center"><Typography fontSize={ 14 }>ASCII</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { rows&&rows.map((row,index)=>{
                        return(
                        <VplcMemoryRow 
                            key={ "word-" + index }
                            word={ row }
                        />
                        )
                    })}
                    </TableBody>
                    
                </Table>
            </TableContainer>
            {/* <TableFooter> */}
                        {/* <TableRow> */}
                            <TablePagination
                                page={ memInfo.page }
                                rowsPerPage={ memInfo.wordsPerPage }
                                count={ memInfo.capacity }
                                colSpan={ 22 }
                                rowsPerPageOptions={[20,20]}
                                showFirstButton
                                showLastButton
                                labelRowsPerPage="Words per page"
                                onPageChange={ handleOnPageChange }
                                onRowsPerPageChange={ handleOnWordsPerChange }
                                sx={{ display: "flex", justifyContent: "flex-end"}}
                                // ActionsComponent={TablePaginationActions}
                            />
                        {/* </TableRow> */}
                    {/* </TableFooter> */}
        </Box>
    )
}

export default VplcMemoryView;