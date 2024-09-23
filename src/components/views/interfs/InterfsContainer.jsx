import React from 'react';

import {
    Button
} from '@mui/material';

import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import GeneralContainerTemplate from '../GeneralContainerTemplate';
import { AlertContext } from '../../widgets/dialogs/AlertContext';

import InterfsListTableView from './InterfsListTableView';
import InterfsSearchView from './InterfsSearchView';
import InterfsAddDialog from './InterfsAddDialog';
import InterfsRetrievalDialog from './InterfsRetrievalDialog';
import InterfsMessageAuditListDialog from '../audit-msg/InterfsMsgAuditDialog';

import { deleteInterfaceByBatch, applyInterfsUseByBatch } from './InterfsApi';

const InterfsContainer = (props) => {

    const { info, warn } = React.useContext(AlertContext);

    const [selectedSeq, setSelectedSeq] = React.useState(0);
    const [interfsList, setInterfsList] = React.useState([]);
    const [interfsAddDialogOpen, setInterfsAddDialogOpen] = React.useState(false);
    const [interfsRetrievalDialogOpen, setInterfsRetrievalDialogOpen] = React.useState(false);
    const [interfsMsgAuditDialogOpen, setInterfsMsgAuditDialogOpen] = React.useState(false);

    const [reload, setReload] = React.useState(false);

    const handleOnInterfaceListChange = (ifList) => {
        setInterfsList(ifList);
        setReload(false);
    }

    const handleOnInterfsRetrieval = (seq) => {
        setInterfsRetrievalDialogOpen(true);
        setSelectedSeq(seq);
    }

    const handleOnInterAuiditMsgHistoryShow = (seq) => {
        setInterfsMsgAuditDialogOpen(true);
        setSelectedSeq(seq);
    }

    const handleOnBatchApplyUse = (use) => {
        const ifList = [];
        interfsList.forEach((interfs, index)=>{
            if(interfs.selected===true) {
                ifList.push(interfs.id);
            }
        });

        applyInterfsUseByBatch(ifList, use, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success to update interfaces' use state", 
                    message: "Successfully updating interfaces' use state [" + ifList + "] to " + use, 
                    modal: false 
                });
                setReload(true);
            } else {
                warn({ 
                    title: "Fail to update interfaces' use state", 
                    message: "Fail updating interfaces' use state [" + ifList + "] to " + use, 
                    modal: true 
                });
            }
        });
    }

    const handleOnBatchDeletion = () => {
        const ifList = [];
        interfsList.forEach((interfs, index)=>{
            if(interfs.selected===true) {
                ifList.push(interfs.id);
            }
        });

        deleteInterfaceByBatch(ifList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success to delete interfaces", 
                    message: "Successfully deleted interfaces [" + ifList + "]", 
                    modal: false 
                });
                setReload(true);
            } else {
                warn({ 
                    title: "Fail to delete interfaces", 
                    message: "Fail deleting interface list [" + ifList + "]", 
                    modal: true 
                });
            }
        });
    }

    const handleOnSearchInterfs = () => {
        setReload(true);
    }

    return (
        <>
        <GeneralContainerTemplate 
            title="Schedule Job 목록"
            searchView={ 
                <InterfsSearchView 
                    onInterfaceListChange={ handleOnInterfaceListChange }
                    reloadInterfaceList={ reload }
                />
            }
            listTableView={
                <InterfsListTableView 
                    title="Interface 목록"
                    count={ interfsList.length }
                    style={{ marginTop: 15 }}
                    interfsList={ interfsList }
                    onInterfsRetrieval={ handleOnInterfsRetrieval }
                    onInterfsAuditMsgHistoryShow={ handleOnInterAuiditMsgHistoryShow }
                    onDeleted={ handleOnSearchInterfs }
                    onUpdated={ handleOnSearchInterfs }
                    operButtons={[
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 2 }}
                            onClick={ ()=>handleOnBatchApplyUse(true) }
                        >
                            일괄발행
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 2 }}
                            onClick={ ()=>handleOnBatchApplyUse(false) }
                        >
                            일괄취소
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 2 }}
                            onClick={ handleOnBatchDeletion }
                        >
                            일괄삭제
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<AddCircleIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 0 }}
                            onClick={ ()=>setInterfsAddDialogOpen(true) }
                        >
                            추가
                        </Button>
                    ]}
               />
            }
            addDialog={
                <InterfsAddDialog 
                    open={ interfsAddDialogOpen }
                    onClose={ ()=>setInterfsAddDialogOpen(false) }
                    onAdditionCompleted={ handleOnSearchInterfs }
                />
            }
        />
        {
            interfsList.length>0 && 
            <InterfsRetrievalDialog 
                title="인터페이스 정보"
                open={ interfsRetrievalDialogOpen }
                onClose={ ()=>setInterfsRetrievalDialogOpen(false) }
                onCancel={ ()=>setInterfsRetrievalDialogOpen(false) }
                onConfirm={ ()=>setInterfsRetrievalDialogOpen(false) }
                interfs={ interfsList[selectedSeq] }
                confirmation
                seq={ selectedSeq }
                onUpdateCompleted={ handleOnSearchInterfs }
            />
        }
        {
            interfsList.length>0 &&
            <InterfsMessageAuditListDialog 
                open= { interfsMsgAuditDialogOpen }
                onClose={ ()=>setInterfsMsgAuditDialogOpen(false) }
                interfsName={ interfsList[selectedSeq]===undefined ? "" : interfsList[selectedSeq].name }
                initialRowsCount={ 50 }
                height="600px"
            />
        }
        </>
    )
}

export default InterfsContainer;