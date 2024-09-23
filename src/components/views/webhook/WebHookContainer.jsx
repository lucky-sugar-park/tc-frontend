import React from 'react';

import {
    Button,
    Tooltip
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import GeneralContainerTemplate from '../GeneralContainerTemplate';
import WebHookAddDialog from './WebHookAddDialog';
import WebHookListTableView from './WebHookListTableView';
import WebHookSearchView from './WebHookSearchView';
import WebHookTestDialog from './WebHookTestDialog';

const WebHookContainer = (props) => {

    const [webHookTestTargetSeq, setWebHookTestTargetSeq] = React.useState(0);
    const [webHookTestDialogOpen, setWebHookTestDialogOpen] = React.useState(false);
    const [webHookAddDialogOpen, setWebHookAddDialogOpen] = React.useState(false);
    const [webHookList, setWebHookList] = React.useState([]);
    const [reload, setReload] = React.useState(true);

    const handleOnBatchDeletion = () => {
        // TO-DO
    }

    const handleOnBatchOperation = () => {
        // TO-DO
    }

    const handleOnWebHookTestDialogOpenRequest = (seq) => {
        setWebHookTestTargetSeq(seq);
        setWebHookTestDialogOpen(true);
    }

    const handleWebHookTestCompleted = (seq, testWebHookInfo) => {
        webHookList[seq].url=testWebHookInfo.url;
        webHookList[seq].sampleData=testWebHookInfo.sampleData;
        webHookList[seq].status=testWebHookInfo.status;
        webHookList[seq].oper="U";
        setWebHookList([...webHookList]);
    }

    const handleOnWebHookListChange = (webHooks) => {
        setWebHookList(webHooks);
        setReload(false);
    }

    const handleOnSearchWebHook = () => {
        setReload(true);
    }

    return (
        <div>
            <GeneralContainerTemplate 
                // title="WebHook 검색"
                searchView={ 
                    <WebHookSearchView
                        hideSearchBy={ false }
                        reloadSearch={ reload }
                        onWebHookListChange={ handleOnWebHookListChange }
                    />
                }
                listTableView={
                    <WebHookListTableView 
                        title="Webhook 목록"
                        count={ webHookList.length }
                        style={{ marginTop: 15 }}
                        webHookList={ webHookList }
                        openWebHookTestDialog={ handleOnWebHookTestDialogOpenRequest }
                        onDeleted={ handleOnSearchWebHook }
                        onUpdated={ handleOnSearchWebHook }
                        operButtons={[
                            <Tooltip title="TO-BE Developed">
                                <Button 
                                    key="web-hook-batch-delete-button"
                                    size="small" 
                                    color="inherit" 
                                    startIcon={<ClearAllIcon color='inherit'/>} 
                                    variant='contained' 
                                    sx={{ mr: 1 }}
                                    onClick={ handleOnBatchOperation }
                                    disabled
                                >
                                    일괄수정
                                </Button>
                            </Tooltip>,
                            <Tooltip title="TO-BE Developed">
                                <Button 
                                    key="web-hook-batch-delete-button"
                                    size="small" 
                                    color="inherit" 
                                    startIcon={<ClearAllIcon color='inherit'/>} 
                                    variant='contained' 
                                    sx={{ mr: 1 }}
                                    onClick={ handleOnBatchDeletion }
                                    disabled
                                >
                                    일괄삭제
                                </Button>
                            </Tooltip>,
                            <Button 
                                key="web-hook-addition-button"
                                size="small" 
                                color="inherit" 
                                startIcon={<AddCircleIcon color='inherit'/>} 
                                variant='contained' 
                                sx={{ mr: 0 }}
                                onClick={ ()=>setWebHookAddDialogOpen(true) }
                            >
                                추가
                            </Button>
                        ]}
                    />
                }
                addDialog={
                    <WebHookAddDialog 
                        open={ webHookAddDialogOpen }
                        onClose={ ()=>setWebHookAddDialogOpen(false) }
                        onAdditionCompleted={ ()=>setReload(true) }
                    />
                }
            />
            <WebHookTestDialog 
                open={ webHookTestDialogOpen }
                seq={ webHookTestTargetSeq }
                onClose={ ()=>setWebHookTestDialogOpen(false) }
                webHookInfo={ webHookList[webHookTestTargetSeq] }
                onTestCompleted={ handleWebHookTestCompleted }
            />
        </div>
    )
}

export default WebHookContainer;