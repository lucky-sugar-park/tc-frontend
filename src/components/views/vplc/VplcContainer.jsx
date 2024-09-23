import React from 'react';

import {
    Button,
    Typography
} from '@mui/material';

import {
    AddCircle as AddCircleIcon,
    ClearAll as ClearAllIcon
} from '@mui/icons-material';

import GeneralContainerTemplate from '../GeneralContainerTemplate';

import VplcAddDialog from './VplcAddDialog';
import VplcListView from './VplcListView';
import VplcSearchView from './VplcSearchView';
import VplcRetrievalDialog from './VplcRetrievalDialog';

const VplcContainer = (props) => {

    const [reload, setReload] = React.useState(false);
    const [vplcList, setVplcList] = React.useState([]);

    const [vplcAddViewOpen, setVplcAddViewOpen] = React.useState(false);
    const [vplcRetrievalInfo, setVplcRetrievalInfo] = React.useState({
        open: false, checkedSeq: 0, editMode: false
    });

    React.useEffect(()=>{
        setReload(true);
    }, []);

    const handleOnVplcListChange = (plcs) => {
        setVplcList(plcs);
        setReload(false);
    }

    const handleOnSearchAllVplc = () => {
        setReload(true);
    }

    const handleOnRetrieval = (seq, editMode=false) => {
        setVplcRetrievalInfo({
            open: true,
            checkedSeq: seq,
            editMode: editMode
        });
    }

    const handleOnUpdated = () => {
        handleOnSearchAllVplc();
    }

    const handleOnDeleted = () => {
        handleOnSearchAllVplc();
    }

    return (
        <>
            <GeneralContainerTemplate 
                searchView={
                    <VplcSearchView 
                        title="Virtual PLC 검색"
                        reloadSearch= { reload }
                        onVplcListChange={ handleOnVplcListChange }
                    />
                }
                listTableView={
                    <VplcListView 
                        title="Virtual PLC 목록"
                        count={ vplcList.length }
                        vplcList={ vplcList }
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
                                onClick={ ()=>console.log("") }
                            >
                                <Typography fontSize={ 14 }>일괄삭제</Typography>
                            </Button>,
                            <Button 
                                size="small" 
                                color="inherit" 
                                startIcon={<AddCircleIcon color='inherit' fontSize='14px'/>} 
                                variant='contained' 
                                sx={{ mr: 0 }}
                                onClick={ ()=>setVplcAddViewOpen(true) }
                            >
                                <Typography fontSize={ 14 }>추가</Typography>
                            </Button>
                        ]}
                        
                    />
                }
                addDialog={
                    <VplcAddDialog 
                        open={ vplcAddViewOpen }
                        onClose={ ()=>setVplcAddViewOpen(false) }
                        onAdditionCompleted={ handleOnSearchAllVplc }
                    />
                }
            />
            <VplcRetrievalDialog 
                title="Virtual PLC 상세"
                open={ vplcRetrievalInfo.open }
                editMode={ vplcRetrievalInfo.editMode }
                onClose={ ()=>setVplcRetrievalInfo({ ...vplcRetrievalInfo, open: false })}
                onCancel={ ()=>setVplcRetrievalInfo({ ...vplcRetrievalInfo, open: false })}
                onUpdateCompleted={ handleOnSearchAllVplc }
                vplcInfo={ vplcList[vplcRetrievalInfo.checkedSeq] }
            />
        </>
    )
}

export default VplcContainer; 