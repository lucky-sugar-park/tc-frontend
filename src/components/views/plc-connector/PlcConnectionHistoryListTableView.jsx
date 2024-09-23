import React from 'react';

import {
    Box,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { searchPlcConnectionEventHistories } from './PlcConnectorApi';
import PlcConnectionHistortyListTableRow from './PlcConnectionHistoryListTableRow';

const PlcConnectionHistoryListTableView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [checkedAll, setCheckedAll] = React.useState(false);
    const [plcConnectorId, setPlcConnectorId] = React.useState("");
    const [plcConHistList, setPlcConHistList] = React.useState([]);
    const [pageInfo, setPageInfo] = React.useState({
        page: 0,
        size: 10,
        sortDirection: "DESCENDING",
        sortBy: ["timestamp"],
        totalCount: 0
    });

    React.useEffect(()=>{
        if(props.plcConId === undefined || "" === props.plcConId) return;

        setCheckedAll(false);
        setPlcConnectorId(props.plcConId);
        fetchPlcConHistList(props.plcConId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.plcConId]);

    const fetchPlcConHistList = (plcConId, pInfo) => {
        const searchCondition = {
            conditions: [{
                name: "plcConnectorId",
                condType: "EQUALS",
                conjType: "NONE",
                value: plcConId
            }],
            pageInfo: pInfo===undefined ? pageInfo : pInfo
        };
        searchPlcConnectionEventHistories(searchCondition, (pageResponse, error)=>{
            if(error===undefined) {
                setPlcConHistList(pageResponse.rows);
                setPageInfo({
                    totalCount: pageResponse.totalRowsCount,
                    page: pageResponse.pageInfo.page,
                    size: pageResponse.pageInfo.size,
                    sortDirection: "DESCENDING",
                    sortBy: ["timestamp"],
                })
            } else {
                Notifier.warn({ 
                    title: "Fail to search PLC Connection Histories", 
                    message: "Fail to search. Cause: [ " + error + " ]", 
                    modal: true 
                });
            }
        })
    }

    const handleAllCheckboxClicked = (e) => {
        for(var i=0;i<plcConHistList.length;i++) plcConHistList[i].checked=!checkedAll;
        setCheckedAll(!checkedAll);
    }

    const handleOnChecked = (seq, checked) => {
        plcConHistList[seq].checked=checked;
        var found=false;
        plcConHistList.forEach((v,i)=>{
            if(!v.checked) {
                found=true;
                return;
            }
        });
        if(!found) setCheckedAll(true);
        else setCheckedAll(false);
    }

    const handleOnPageChange = (event, page) => {
        const pInfo = pageInfo;
        pInfo.page = parseInt(page, 0);
        fetchPlcConHistList(plcConnectorId, pInfo);
    }

    const handleOnRowsPerPageChange = (event) => {
        const pInfo = pageInfo;
        pInfo.size = parseInt(event.target.value, 10)
        fetchPlcConHistList(plcConnectorId, pInfo);
    }

    return (
        <TableContainer component={ Box }>
            <div style={{ overflow: 'auto', maxHeight: '650px' }}>
                <Table>
                    <TableHead
                        style={{ 
                            backgroundColor: theme.palette.background.tableHead, 
                            position: "sticky", 
                            top: 0, 
                            zIndex: 1 
                        }}
                    >
                        <TableRow sx={{ height: "45px", backgroundColor: theme.palette.background.tableHead }}>
                            <TableCell size="small" padding='checkbox'>
                                <Checkbox 
                                    checked={ checkedAll }
                                    onClick={ handleAllCheckboxClicked }
                                    size='small'
                                />
                            </TableCell>
                            <TableCell size="small">
                                <Typography fontSize={ 14}>커넥터 ID</Typography>
                            </TableCell>
                            <TableCell size="small">커넥터 이름</TableCell>
                            <TableCell size="small">이벤트 타입</TableCell>
                            {/* <TableCell size="small">발행상태</TableCell>
                            <TableCell size="small">연결상태</TableCell> */}
                            <TableCell size="small">이벤트시간</TableCell>
                            <TableCell size="small">이벤트원인</TableCell>
                            <TableCell size="small">설명</TableCell>
                            <TableCell size="small">JSON</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plcConHistList && plcConHistList.map((hist, index) => {
                            return (
                                <PlcConnectionHistortyListTableRow 
                                    { ...props }
                                    key={ "plc-connector-" + index }
                                    seq={ index }
                                    plcConHistInfo={ hist }
                                    checked={ hist.checked === undefined ? false : hist.checked }
                                    onChecked={ handleOnChecked }
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <Box sx={{ m:0, p:0, display: "flex", justifyContent: "flex-end" }}>
                <TablePagination
                    onPageChange={ handleOnPageChange }
                    page={ pageInfo.page }
                    rowsPerPage={ pageInfo.size }
                    count={ pageInfo.totalCount }
                    onRowsPerPageChange={ handleOnRowsPerPageChange }
                    showFirstButton
                    showLastButton
                />
            </Box>
        </TableContainer>
    )
}

export default PlcConnectionHistoryListTableView;