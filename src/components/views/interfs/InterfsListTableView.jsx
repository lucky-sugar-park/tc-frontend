import React from 'react';

import {
    Box,
    Checkbox,
    Divider,
    TablePagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { deleteInterfaceById  } from './InterfsApi';
import InterfsListTableRow from './InterfsListTableRow';

const InterfsListTableView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [selectedAll, setSelectedAll] = React.useState(false);
    const [interfsList, setInterfsList] = React.useState(props.interfsList);

    React.useEffect(()=>{
        setInterfsList(props.interfsList);
        setSelectedAll(false);
    }, [props.interfsList]);

    const handleOnAllCheckboxClicked = (e) => {
        for(var i=0;i<interfsList.length;i++) interfsList[i].selected=!selectedAll;
        setSelectedAll(!selectedAll);
    }

    const handleOnSelectedInterfs = (seq, selected) => {
        interfsList[seq].selected=selected;
        var found=false;
        interfsList.forEach((v,i)=>{
            if(!v.selected) {
                found=true;
                return;
            }
        });
        if(!found) setSelectedAll(true);
        else setSelectedAll(false);
    }

    const handleOnInterfsUpdated = (interfs, idx) => {
        setInterfsList[idx]=interfs;
        setInterfsList(interfsList);
    }

    const handleOnDelete = (id, name) => {
        deleteInterfaceById(id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ title: "Success Interface Deletion", message: "Deleted interface successfully["+name+"]", modal: true });
            } else {
                Notifier.warn({ title: "Fail Inteface Deletion", message: "No deleted interface["+name+"]", modal: true });
            }
        });
        props.onDeleted();
    }

    return (
        <TableContainer component={ Box } >
            <Box sx={{ m:0, p:0, mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant='h7'>{ props.title } ( { props.count } )</Typography>
                    </Box>
                    <Box sx={{ m: 0, mt: 0, pr: 0 }}>
                    { props.operButtons }
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 1}} />
            <div style={{ overflow: 'auto', maxHeight: '550px' }}>
                {/* <Table stickyHeader> */}
                <Table>
                    <TableHead 
                        style={{ 
                            backgroundColor: theme.palette.background.tableHead, 
                            position: "sticky", 
                            top: 0, 
                            zIndex: 1 
                        }}
                    >
                        <TableRow>
                            <TableCell align="center" size="small"></TableCell>
                            <TableCell type="small" padding='checkbox'>
                                <Checkbox 
                                    checked={ selectedAll }
                                    onClick={ handleOnAllCheckboxClicked }
                                    size='small'
                                />
                            </TableCell>
                            <TableCell size="small">이름</TableCell>
                            <TableCell size="small">IF타입</TableCell>
                            <TableCell size="small">대상PLC</TableCell>
                            <TableCell size="small">응답IF</TableCell>
                            <TableCell size="small">상태</TableCell>
                            <TableCell size="small">설명</TableCell>
                            <TableCell align="center" size="small">관리</TableCell>
                            <TableCell align="center" size="small">Audit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { interfsList && interfsList.map((interfs,index)=>{
                        return (
                        <InterfsListTableRow 
                            key= { "interfs-" + index }
                            seq={ index }
                            interfs={ interfs }
                            selected={ interfs.selected === undefined ? false : interfs.selected }
                            onSelected={ handleOnSelectedInterfs }
                            onRowUpdated={ handleOnInterfsUpdated }
                            onDelete={ handleOnDelete }
                            { ...props }
                        />
                        )
                    }) }
                    </TableBody>
                </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <TablePagination
                    onPageChange={()=>console.log("") }
                    page={ 1 }
                    rowsPerPage={ 10 }
                    count={ 100 }
                    onRowsPerPageChange={()=>console.log("")}
                    showFirstButton
                    showLastButton
                />
             </div>
        </TableContainer>
    )
}

export default InterfsListTableView;