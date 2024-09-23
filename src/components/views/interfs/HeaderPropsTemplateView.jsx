import React from 'react';

import {
    Box,
    Button,
    Radio,
    TablePagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import LongTextDialog from '../../widgets/dialogs/LongTextDialog';
import { searchHeaderTemplates } from './InterfsApi';

const HeaderPropsTemplateListView = (props) => {

    const { alert, info, success, warn, error } = React.useContext(AlertContext);

    const [templateList, setTemplateList] = React.useState([]);
    const [selectedNum, setSelectedNum] = React.useState(-1);
    const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [detailsValue, setDetailsValue] = React.useState("");

    React.useEffect(()=>{
        fetchHeaderTemplate({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchHeaderTemplate = (condition) => {
        searchHeaderTemplates(condition, (resp, error)=>{
            if(error===undefined) {
                setTemplateList(resp);
                props.onTemplateSelect(resp[0]);
            } else {
                warn({
                    title: "Templates Feching Failure",
                    message: "Fail fecthing header's templates from server." + error,
                    modal: true
                })
            }
        });
    }

    const handleOnTemplalteSelect = (seq) => {
        setSelectedNum(seq);
        props.onTemplateSelect(templateList[seq]);
    }

    const handleOnDetailsCancel = () => {
        setDetailsOpen(false);
    }

    const showHeaderPropsDetails = (seq) => {
        setDetailsOpen(true);
        setDetailsValue(JSON.stringify(templateList[seq].headers, null, 4));
    }

    return (
        <Box>
            <TableContainer>
                <div style={{ overflow: 'auto', maxHeight: '550px' }}>
                <Table size='small' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>선택</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>제조사</TableCell>
                            <TableCell>PLC Model</TableCell>
                            <TableCell>프로토콜</TableCell>
                            <TableCell>설명</TableCell>
                            <TableCell>헤더 상세보기</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <RadioGroup name="aaaa" value={ selectedNum } /> */}
                    <TableBody>
                    {
                        templateList&&templateList.map((template, index)=>{
                            return(
                        <TableRow key={ "headerProps-"+index }>
                            <TableCell>
                                <Radio 
                                    size="small" 
                                    checked={ selectedNum===index } 
                                    name="aaaa" 
                                    value={ index } 
                                    onChange={ ()=>handleOnTemplalteSelect(index)} 
                                />
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontSize: 14 }}>{ template.id }</Typography>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={ template.name }>
                                    <Typography noWrap sx={{ width:"250px", fontSize: 14 }}>{ template.name }</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontSize: 14 }}>{ template.plcManufacturer} </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontSize: 14 }}>{ template.plcModel} </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontSize: 14 }}>{ template.protocol }</Typography>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={ template.description }>
                                    <Typography noWrap sx={{ width:"200px", fontSize: 14 }}>{ template.description }</Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Button 
                                    sx={{ fontSize: 14 }}
                                    startIcon={ <DetailsIcon /> }
                                    onClick={ ()=>showHeaderPropsDetails(index) }
                                >
                                    헤더정보
                                </Button>
                            </TableCell>
                        </TableRow> 
                            )
                        })
                    }
                    </TableBody>
                </Table>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                <TablePagination
                    onPageChange={()=>console.log("") }
                    page={ 0 }
                    rowsPerPage={ 10 }
                    count={ templateList.length }
                    onRowsPerPageChange={()=>console.log("")}
                    showFirstButton
                    showLastButton
                />
                <LongTextDialog
                    title="Header Props"
                    open={ detailsOpen }
                    onCancel={ handleOnDetailsCancel }
                    editMode={ false }
                    value={ detailsValue }
                />
             </div>
            </TableContainer>
        </Box>
    )
}

export default HeaderPropsTemplateListView;