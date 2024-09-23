import React from 'react';

import { 
    Box,
    Checkbox,
    Divider,
    Table, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableBody,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import { deleteWebHookByName, updateWebHook } from './WebHookApi';
import WebHookListTableRow from './WebHookListTableRow';

const WebHookListTableView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [webHookList, setWebHookList] = React.useState(props.webHookList);
    const [selectedAll, setSelectedAll] = React.useState(false);

    React.useEffect(()=>{
        setWebHookList(props.webHookList);
    }, [props.webHookList]);

    const handleOnAllCheckboxClicked = (e) => {
        for(var i=0;i<webHookList.length;i++) webHookList[i].selected=!selectedAll;
        setSelectedAll(!selectedAll);
    }

    const handleOnSelectedWebHook = (seq, selected) => {
        webHookList[seq].selected=selected;
        var found=false;
        webHookList.forEach((v,i)=>{
            if(!v.selected) {
                found=true;
                return;
            }
        });
        if(!found) setSelectedAll(true);
        else setSelectedAll(false);
    }

    const handleOnDelete = (id, name) => {
        deleteWebHookByName(name, (resp, error)=>{
            if(error===undefined) {
                props.onDeleted();
            } else {
                Notifier.warn({ title: "", message: "", modal: true });
            }
        });
    }

    const handleOnUpdate = (webHookInfo) => {
        updateWebHook(webHookInfo, (resp, error)=>{
            if(error===undefined) {
                props.onUpdated();
                Notifier.info({ title: "Success to update WebHook", message: "Success to update WebHook [ " + webHookInfo.name + " ]", modal: false })
            } else {
                Notifier.warn({ title: "Fail to update WebHook", message: "Fail to update WebHook [ " + webHookInfo.name + " ]", modal: true })
            }
        });
    }

    const handleOnWebHookUpdated = (idx, webHook) => {
        webHookList[idx]=webHook;
        setWebHookList([ ...webHookList ]);
    }
    
    return (
        // <TableContainer component={ Paper }>
        <TableContainer>
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
            <div>
            <Table stickyHeader >
                <TableHead>
                    <TableRow sx={{ height: "45px", backgroundColor: theme.palette.background.tableHead }}>
                        <TableCell type="small" padding='checkbox'>
                            <Checkbox 
                                checked={ selectedAll }
                                onClick={ handleOnAllCheckboxClicked }
                                size='small'
                            />
                        </TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>이름</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>URL</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }} align='center'>상태</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>샘플데이터</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>설명</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>테스트</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>삭제</TableCell>
                        <TableCell size="small" sx={{ p: 0, m: 0 }}>수정</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    webHookList&&webHookList.map((webHook, index)=>{
                        return (
                            <WebHookListTableRow 
                                { ...props }
                                key= { "webHook-" + index }
                                seq={ index }
                                webHook={ webHook }
                                selected={ webHook.selected===undefined ? false : webHook.selected }
                                onSelected={ handleOnSelectedWebHook }
                                onRowUpdated={ handleOnWebHookUpdated }
                                onDelete={ handleOnDelete }
                                onUpdate={ handleOnUpdate }
                            />        
                        )
                    })
                }
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

export default WebHookListTableView;