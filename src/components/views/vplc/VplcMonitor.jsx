import React from 'react';
import { useLocation } from 'react-router-dom';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Fab,
    Link,
    Tooltip,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { memTypeItems } from './VplcCommonCodes';
import { startVplc, stopVplc, pauseVplc, resumeVplc } from './VplcApi';
import VplcSearchView from './VplcSearchView';
import VplcPortListMonitoringPanel from './VplcPortListMonitoringPanel';
import VplcRetrievalDialog from './VplcRetrievalDialog';
import VplcControlPanel from './VplcControlPanel';
import VplcMemoryView from './VplcMemoryView';
import VplcMonitorFloatControlToolbar from './VplcMonitorFloatControlToolbar';

const VplcMonitor = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const positionRef = React.useRef({
        x: 0, y: 0,
    });
    const popperRef = React.useRef(null);
    const areaRef = React.useRef(null);

    const location = useLocation();
    const vplcInfo = location.state!=null? location.state.vplcInfo : undefined;

    const [reload, setReload] = React.useState(false);
    const [vplcList, setVplcList] = React.useState([]);
    const [selectedVplcInfo, setSelectedVplcInfo] = React.useState(undefined);
    const [searchResultExpand, setSearchResultExpand] = React.useState(false);
    const [openVplcRetrievalInfo, setOpenVplcRetrievalInfo] = React.useState(false);

    const [memCommand, setMemCommand] = React.useState(undefined);

    const [panelsOpen, setPanelsOpen] = React.useState({
        openSearchPanel: false,
        openPortsPanel: false,
        openControlPanel: false
    });

    React.useEffect(()=>{
        if(vplcInfo !== undefined) {
            setSelectedVplcInfo(vplcInfo);
        }
    }, [vplcInfo]);

    const memTypeOptions = React.useMemo (
        ()=> {
            if(memCommand&&memCommand.vplcId===selectedVplcInfo.id) return;

            const optionItems = [];
            if(selectedVplcInfo===undefined || selectedVplcInfo.memoryTypeList===undefined) return optionItems;
            for(var i=0;i<memTypeItems.length;i++) {
                for(var j=0;j<selectedVplcInfo.memoryTypeList.length;j++) {
                    if(memTypeItems[i].value===selectedVplcInfo.memoryTypeList[j]) {
                        optionItems.push(memTypeItems[i]);
                        break;
                    }
                }
            }
            setMemCommand({
                type: "READ",
                vplcId: selectedVplcInfo.id,
                vplcName: selectedVplcInfo.name,
                memoryType: (selectedVplcInfo.memoryTypeList&&selectedVplcInfo.memoryTypeList.length>0 ? selectedVplcInfo.memoryTypeList[0] : "D"),
                frameFormat: selectedVplcInfo.frameFormat,
                startAddress: 0,
                wordCount: 20
            });
            return optionItems;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedVplcInfo]
    );

    const handleOnVplcListChange = (vplcList) => {
        setVplcList(vplcList);
        setReload(false);
        setSearchResultExpand(true);
    }

    const handleOnVplcSelected = (seq) => {
        const temp=vplcList;
        for(var i=0;i<temp.length;i++) {
            if(seq===i) temp[i].selected=true;
            else temp[i].selected=false;
        }
        setVplcList(temp);
        setSelectedVplcInfo(vplcList[seq]);
    }

    const handleMouseMove = (event) => {
        positionRef.current = { x: event.clientX, y: event.clientY };
    
        if (popperRef.current != null) {
            popperRef.current.update();
        }
    };

    const handleOnOpenVplcRetrievalInfo = (seq) => {
        handleOnVplcSelected(seq);
        setOpenVplcRetrievalInfo(true);
    }

    const handleOnMemOperCommand = (memCommand) => {
        setMemCommand({
            ...memCommand,
            vplcId: selectedVplcInfo.id,
            vplcName: selectedVplcInfo.name,
            frameFormat: selectedVplcInfo.frameFormat
        });
    }

    const handleOnControlCompleted = (vplcUpdated, error, cmd) => {
        if(error===undefined) {
            Notifier.info({
                title: "Success to execute command",
                message: "Success executing command [" + cmd + "] with vplc [" + vplcUpdated.id + "]",
                modal: false
            });
            setSelectedVplcInfo(vplcUpdated);
            if(vplcList !== undefined && vplcList.length > 0) {
                for(var i=0;i<vplcList.length;i++) {
                    if(vplcUpdated.id===vplcList[i].id) {
                        vplcList[i]=vplcUpdated;
                        break;
                    }
                }
            }
        } else {
            Notifier.warn({
                title: "Fail to execute command",
                message: "Fail executing command ["+cmd+"], cause: " + error,
                modal: true
            });
        }
    }

    const handleOnControlCommand = (vplcId, cmd) => {
        switch(cmd) {
            case "START":
                startVplc(vplcId, (resp, error)=>handleOnControlCompleted(resp, error, cmd));
                break;
            case "STOP":
                stopVplc(vplcId, (resp, error)=>handleOnControlCompleted(resp, error, cmd));
                break;
            case "PAUSE":
                pauseVplc(vplcId, (resp, error)=>handleOnControlCompleted(resp, error, cmd));
                break;
            case "RESUME":
                resumeVplc(vplcId, (resp, error)=>handleOnControlCompleted(resp, error, cmd));
                break;
            default:
                Notifier.warn({
                    title: "Wrong control command",
                    message: "Command should be one of the [ START, STOP, PAUSE, RESUME], Your command is " + cmd,
                    modal: true
                });
        }
    }

    return (
        <Box>
            <Box>
                <Typography variant='h7'>VPLC 모니터링</Typography>
            </Box>
            <Box>
                <VplcMonitorFloatControlToolbar 
                    vplcId={ selectedVplcInfo && selectedVplcInfo.id }
                    vplcName={ selectedVplcInfo && selectedVplcInfo.name }
                    vplcStatus={ selectedVplcInfo && selectedVplcInfo.status }
                    onShowSearchChange={ (checked)=>setPanelsOpen({ ...panelsOpen, openSearchPanel: checked }) }
                    onShowPortsChange={ (checked)=>setPanelsOpen({ ...panelsOpen, openPortsPanel: checked }) }
                    onShowControlPanelChange={ (checked)=>setPanelsOpen({ ...panelsOpen, openControlPanel: checked }) }
                    onControlCommand={ handleOnControlCommand }
                />
            </Box>
            <Box sx={{ height: "100%", overflow: 'auto' }}>    
                <Accordion sx={{ mt: 2, display: panelsOpen.openSearchPanel ? "block" : "none" }} expanded={ searchResultExpand } disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={ ()=>setSearchResultExpand(true)} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={ ()=>setSearchResultExpand(!searchResultExpand) }
                    >
                        <Typography>Virtual PLC Search</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <VplcSearchView 
                                reloadSearch= { reload }
                                onVplcListChange={ handleOnVplcListChange }
                            />
                        </Box>
                        <Divider sx={{ mt: 3, mr: 1 }} />
                        <Box sx={{ mr: 1 }}>
                        { vplcList && vplcList.map((vplc, index)=>{
                            return (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Tooltip 
                                    title={ vplc.description } 
                                    arrow
                                    PopperProps={{
                                        popperRef,
                                        anchorEl: {
                                            getBoundingClientRect: ()=> {
                                                return new DOMRect(
                                                    positionRef.current.x+5,
                                                    // areaRef.current.getBoundingClientRect().y,
                                                    positionRef.current.y+5,
                                                    0,0
                                                );
                                            }
                                        }
                                    }}
                                    // slotProps={{
                                    //     popper: {
                                    //         modifiers: [
                                    //             {
                                    //                 name: 'offset',
                                    //                 options: {
                                    //                     offset: [-200, 0]
                                    //                 }
                                    //             }
                                    //         ]
                                    //     }
                                    // }}
                                >
                                    <Typography
                                        sx={{ 
                                            fontSize: 14, p: 0.5, pl: 1.5, mt: 1, cursor: "pointer", 
                                            ":hover": { 
                                                backgroundColor: "info.light",
                                                color: "info.contrastText"
                                            },
                                            backgroundColor: vplc.selected ? "info.main" : "",
                                            color: vplc.selected ? "info.contrastText" : "",
                                        }}
                                        onClick={ ()=>handleOnVplcSelected(index) }
                                        ref={ areaRef }
                                        onMouseMove={ handleMouseMove }
                                        noWrap
                                    >
                                        { (index+1) + ": " + vplc.id + ", " + vplc.name + ", " + vplc.ipAddress + ", " + vplc.frameFormat + ", " + vplc.manufacturer + ", " + vplc.status }
                                    </Typography>
                                </Tooltip>
                                <Link 
                                    sx={{ cursor: "pointer",  mt: 1, ml: 1, color: "info.constractText" }}
                                    onClick={ ()=>handleOnOpenVplcRetrievalInfo(index) }
                                    underline='none'
                                >
                                    <Typography fontSize={ 14 }>( Details )</Typography>
                                </Link>
                            </Box>
                            )
                        })}
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ mt: 1, display: panelsOpen.openPortsPanel ? "block" : "none" }} disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1b-content"
                        id="panel1b-header"
                    >
                        <Typography>Virtual PLC Port - [ { selectedVplcInfo && selectedVplcInfo.name + "-" +  selectedVplcInfo.status } ] </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <VplcPortListMonitoringPanel 
                            vplcId={ selectedVplcInfo && selectedVplcInfo.id }
                            vplcName={ selectedVplcInfo && selectedVplcInfo.name }
                            portList={ selectedVplcInfo && selectedVplcInfo.connections }
                            onRetrieval={ ()=>setOpenVplcRetrievalInfo(true) }
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ mt: 1, display: panelsOpen.openControlPanel ? "block" : "none" }} disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1b-content"
                        id="panel1b-header"
                    >
                        <Typography>Virtual PLC Control Panel - [ { selectedVplcInfo && selectedVplcInfo.name + "-" +  selectedVplcInfo.status } ]</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <VplcControlPanel 
                            memTypeOptions={ memTypeOptions }
                            vplcId={ selectedVplcInfo && selectedVplcInfo.id }
                            vplcName={ selectedVplcInfo && selectedVplcInfo.name }
                            vplcStatus={ selectedVplcInfo && selectedVplcInfo.status }
                            frameFormat={ selectedVplcInfo && selectedVplcInfo.frameFormat }
                            onMemOperCommand={ handleOnMemOperCommand }
                            onControlCommand={ handleOnControlCommand }
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{ mt: 2, ml: 2, mr: 2, height: "100%" }}>
                <Typography>Virtual PLC Memory Datail Value - [ { selectedVplcInfo && selectedVplcInfo.name + "-" +  selectedVplcInfo.status } ]</Typography>
                <VplcMemoryView 
                    vplcId={ selectedVplcInfo && selectedVplcInfo.id }
                    vplcName={ selectedVplcInfo && selectedVplcInfo.name }
                    command={ memCommand }
                />
            </Box>
            <VplcRetrievalDialog 
                title="Virtual PLC 상세"
                open={ openVplcRetrievalInfo }
                editMode={ false}
                onClose={ ()=>setOpenVplcRetrievalInfo(false) }
                onCancel={ ()=>setOpenVplcRetrievalInfo(false) }
                vplcInfo={ selectedVplcInfo }
            />
        </Box>
    )
}

export default VplcMonitor;