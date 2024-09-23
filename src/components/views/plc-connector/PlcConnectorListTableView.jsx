import React from 'react';
import { 
    Box,
    Checkbox,
    Table, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableBody,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import PlcConnectorListTableViewRow from './PlcConnectorListTableViewRow';


const PlcConnectorListTableView = (props) => {

    const theme = useTheme();

    const [plcConList, setPlcConList] = React.useState(props.plcConList);
    const [checkedAll, setCheckedAll] = React.useState(false);

    React.useEffect(()=>{
        setPlcConList(props.plcConList);
        setCheckedAll(false);
    }, [props.plcConList]);

    const handleAllCheckboxClicked = (e) => {
        for(var i=0;i<plcConList.length;i++) plcConList[i].checked=!checkedAll;
        setCheckedAll(!checkedAll);
    }

    const handleOnChecked = (seq, checked) => {
        plcConList[seq].checked=checked;
        var found=false;
        plcConList.forEach((v,i)=>{
            if(!v.checked) {
                found=true;
                return;
            }
        });
        if(!found) setCheckedAll(true);
        else setCheckedAll(false);
    }


    return (
        <TableContainer component={ Box }>
            <div style={{ overflow: 'auto', maxHeight: '550px' }}>
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
                            <Typography fontSize={ 14}>이름</Typography>
                        </TableCell>
                        <TableCell size="small">Host IP</TableCell>
                        <TableCell size="small">시작포트</TableCell>
                        <TableCell size="small">포트수</TableCell>
                        <TableCell size="small">제조사</TableCell>
                        <TableCell size="small">발행상태</TableCell>
                        <TableCell size="small">연결상태</TableCell>
                        <TableCell size="small">메시지 포맷</TableCell>
                        <TableCell size="small">발행/해재</TableCell>
                        <TableCell size="small">연결테스트</TableCell>
                        <TableCell size="small" align='center'>연결이력</TableCell>
                        <TableCell size="small" align='center'>삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    plcConList.map((plcConInfo, index)=>{
                        return (
                    <PlcConnectorListTableViewRow 
                        { ...props }
                        key={ "plc-" + index }
                        seq={ index }
                        plcConInfo={ plcConInfo }
                        checked={ plcConInfo.checked === undefined ? false : plcConInfo.checked }
                        onChecked={ handleOnChecked }
                        // onRowUpdated={ handleOnInterfsUpdated }
                        // onDelete={ handleOnDelete }
                        
                    />
                        )
                    })
                }
                </TableBody>
                <TablePagination
                    onPageChange={()=>console.log("") }
                    page={ 1 }
                    rowsPerPage={ 10 }
                    count={ 100 }
                    onRowsPerPageChange={()=>console.log("")}
                    showFirstButton
                    showLastButton
                />
            </Table>
            </div>
        </TableContainer>
    )
}

export default PlcConnectorListTableView;