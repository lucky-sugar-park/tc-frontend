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

import VplcListTableViewRow from './VplcListTableViewRow';

const VplcListTableView = (props) => {

    const theme = useTheme();

    const [vplcList, setVplcList] = React.useState(props.vplcList);
    const [checkedAll, setCheckedAll] = React.useState(false);

    React.useEffect(()=>{
        setVplcList(props.vplcList);
        setCheckedAll(false);
    }, [props.vplcList]);

    const handleAllCheckboxClicked = (e) => {
        for(var i=0;i<vplcList.length;i++) vplcList[i].checked=!checkedAll;
        setCheckedAll(!checkedAll);
    }

    const handleOnChecked = (seq, checked) => {
        vplcList[seq].checked=checked;
        var found=false;
        vplcList.forEach((v,i)=>{
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
                                <Typography fontSize={ 14}>ID</Typography>
                            </TableCell>
                            <TableCell size="small">
                                <Typography fontSize={ 14}>이름</Typography>
                            </TableCell>
                            <TableCell size="small">IP Address</TableCell>
                            <TableCell size="small">시작포트</TableCell>
                            <TableCell size="small">포트수</TableCell>
                            <TableCell size="small">제조사</TableCell>
                            <TableCell size="small">상태</TableCell>
                            <TableCell size="small">메시지 포맷</TableCell>
                            <TableCell size="small">발행/해재</TableCell>
                            <TableCell size="small">조작</TableCell>
                            <TableCell size="small" align='center'>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        vplcList.map((vplcInfo, index)=>{
                            return (
                        <VplcListTableViewRow 
                            { ...props }
                            key={ "vplc-" + index }
                            seq={ index }
                            vplcInfo={ vplcInfo }
                            checked={ vplcInfo.checked === undefined ? false : vplcInfo.checked }
                            onChecked={ handleOnChecked }
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

export default VplcListTableView;