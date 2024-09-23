import React from 'react';
import { 
    Button, 
    Typography 
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import GeneralContainerTemplate from '../GeneralContainerTemplate';

import PlcConnectorListView from './PlcConnectorListView';
import PlcConnectorAddDialog from './PlcConnectorAddDialog';

import PlcConnectorSearchView from './PlcConnectorSearchView';
import PlcConnectorRetrievalDialog from './PlcConnectorRetrievalDialog';

const PlcConnectorContainer = (props) => {

    const [reload, setReload] = React.useState(false);
    const [plcConList, setPlcConList] = React.useState([]);

    const [plcConnectorAddViewOpen, setPlcConnectorAddViewOpen] = React.useState(false);
    const [plcConnectorRetrievalInfo, setPlcConnectorRetrievalInfo] = React.useState({
        open: false, checkedSeq: 0, editMode: false
    });

    React.useEffect(()=>{
        setReload(true);
    }, []);

    const handleOnPlcConnectorListChange = (plcConnectores) => {
        setPlcConList(plcConnectores);
        setReload(false);
    }

    const handleOnSearchAllPlcConnectores = () => {
        setReload(true);
    }

    const handleOnRetrieval = (seq, editMode=false) => {
        setPlcConnectorRetrievalInfo({
            open: true,
            checkedSeq: seq,
            editMode: editMode
        });
    }

    const handleOnUpdated = () => {
        handleOnSearchAllPlcConnectores();
    }

    const handleOnDeleted = () => {
        handleOnSearchAllPlcConnectores();
    }

    return (
        <>
        <GeneralContainerTemplate 
                // title="PLC 검색"
                searchView={ 
                    <PlcConnectorSearchView
                        reloadSearch={ reload }
                        onPlcListChange={ handleOnPlcConnectorListChange }
                    />
                }
                listTableView={
                    <PlcConnectorListView 
                        title="PLC Connector 목록"
                        count={ plcConList.length }
                        plcConList={ plcConList }
                        onRetrieval={ handleOnRetrieval }
                        onUpdated={ handleOnUpdated }
                        onDeleted={ handleOnDeleted }
                        operButtons={[
                            <Button 
                                size="small" 
                                color="inherit" 
                                startIcon={<ClearAllIcon color='inherit' fontSize='14px'/>} 
                                variant='contained' 
                                sx={{ mr: 1.5 }}
                                disabled
                            // onClick={()=>setPlcAddViewOpen(true)}
                            >
                                <Typography fontSize={ 14 }>일괄삭제</Typography>
                            </Button>,
                            <Button 
                                size="small" 
                                color="inherit" 
                                startIcon={<AddCircleIcon color='inherit' fontSize='14px'/>} 
                                variant='contained' 
                                sx={{ mr: 0 }}
                                onClick={()=>setPlcConnectorAddViewOpen(true)}
                            >
                                <Typography fontSize={ 14 }>추가</Typography>
                            </Button>
                        ]}
                    />
                }
                addDialog={
                    <PlcConnectorAddDialog 
                        open={ plcConnectorAddViewOpen }
                        onClose={ ()=>setPlcConnectorAddViewOpen(false) }
                        onAdditionCompleted={ handleOnSearchAllPlcConnectores }
                    />
                }
            />
            {/* <WebHookTestDialog 
                open={ webHookTestDialogOpen }
                seq={ webHookTestTargetSeq }
                onClose={ ()=>setWebHookTestDialogOpen(false) }
                webHookInfo={ webHookList[webHookTestTargetSeq] }
                onTestCompleted={ handleWebHookTestCompleted }
            /> */}
            <PlcConnectorRetrievalDialog 
                title="PLC Connector 상세"
                open={ plcConnectorRetrievalInfo.open }
                editMode={ plcConnectorRetrievalInfo.editMode }
                onClose={ ()=>setPlcConnectorRetrievalInfo({ ...plcConnectorRetrievalInfo, open: false })}
                onCancel={ ()=>setPlcConnectorRetrievalInfo({ ...plcConnectorRetrievalInfo, open: false })}
                onUpdateCompleted={ handleOnSearchAllPlcConnectores }
                plcConInfo={ plcConList[plcConnectorRetrievalInfo.checkedSeq] }
            />
        </>
    )
}

export default PlcConnectorContainer;