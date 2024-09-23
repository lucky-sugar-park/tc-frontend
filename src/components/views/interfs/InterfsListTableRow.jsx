import React from 'react';

import {
    Checkbox,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Tooltip
} from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import SimpleTab from '../../widgets/tabs/SimpleTab';
import { applyInterfsUse  } from './InterfsApi';
import InterfsDataPropListTable from './InterfsDataPropListTable';
import InterfsHeaderPropListTable from './InterfsHeaderPropListTable';

const InterfsListTableRow = (props) => {

    const [selected, setSelected] = React.useState(false);
    const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [interfs, setInterfs] = React.useState(props.interfs);
    const [use, setUse] = React.useState(props.interfs.use);

    React.useEffect(()=>{
        setInterfs(props.interfs);
        setUse(props.interfs.use);
    }, [props.interfs]);

    React.useEffect(()=>{
        setSelected(props.selected);
        setInterfs({
            ...interfs,
            selected: props.selected
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selected]);

    const handleCheckboxClicked = (e) => {
        props.onSelected(props.seq, !selected);
        setInterfs({
            ...interfs,
            selected:!selected
        })
        setSelected(!selected);
    }

    const handleOnInterfsRetrieval = () => {
        props.onInterfsRetrieval(props.seq);
    }

    const handleOnInterfsDelete = (id) => {
        props.onDelete(id, interfs.name);
    }

    const handleOnAuditMessageHistoryShow = (seq) => {
        props.onInterfsAuditMsgHistoryShow(seq);
    }

    const handleOnInterfsUse = (id, use) => {
        applyInterfsUse(id, use, (interfsInfo, error)=>{
            if(error===undefined) {
                setInterfs({
                    ...interfs,
                    use: interfsInfo.use
                });
                setUse(interfsInfo.use);
            } else {
                console.log("Error during update use." + error);
            }
        });
    }

    return(
        <React.Fragment>
            <TableRow 
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setDetailsOpen(!detailsOpen) }
                    >
                        { detailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell type="small" padding='checkbox' >
                    <Checkbox 
                        checked={ selected }
                        onClick={ handleCheckboxClicked }
                        size='small'
                    />
                </TableCell>
                <TableCell onClick={ handleOnInterfsRetrieval } sx={{ cursor: "pointer" }}>{ interfs.name }</TableCell>
                <TableCell>{ interfs.interfaceType }</TableCell>
                <TableCell>{ interfs.plcName }</TableCell>
                <TableCell>{ interfs.replyName }</TableCell>
                <TableCell>{ use ? "사용중" : "미사용" }</TableCell>
                <TableCell>{ interfs.description }</TableCell>
                <TableCell align="center">
                    <Tooltip title="삭제">
                        <IconButton onClick={ ()=>handleOnInterfsDelete(interfs.id) }>
                            <RemoveCircleIcon/>
                        </IconButton>
                    </Tooltip>
                {
                use===false ?
                    <Tooltip title="적용">
                        <IconButton onClick={ ()=>handleOnInterfsUse(interfs.id, true) }>
                            <ScheduleIcon />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="미적용">
                        <IconButton onClick={ ()=>handleOnInterfsUse(interfs.id, false) }>
                            <HistoryToggleOffIcon/>
                        </IconButton>
                    </Tooltip>
                }
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="IF 메시지 이력보기">
                        <IconButton onClick={ ()=>handleOnAuditMessageHistoryShow(props.seq) }>
                            <WorkHistoryIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 2 }} colSpan={ 11 }>
                    <Collapse in={ detailsOpen } timeout="auto" unmountOnExit>
                        <SimpleTab 
                        tabs={[
                            { label: "Header Props" },
                            { label: "Data Props" }
                        ]}
                        panels={[
                            <InterfsHeaderPropListTable 
                                rows={ interfs.headerProps }
                            />,
                            <InterfsDataPropListTable 
                                rows={  interfs.dataProps }
                            />
                        ]}
                    />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default InterfsListTableRow;