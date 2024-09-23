import React from 'react';

import {
    Box,
    Button
} from '@mui/material';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import { updateInterface } from './InterfsApi';
import InterfsSvcTestView from './InterfsSvcTestView';
import InterfsInfoView from './InterfsInfoView';
import InterfsHeaderPropListTable from './InterfsHeaderPropListTable';
import InterfsDataPropListTable from './InterfsDataPropListTable';

const InterfsRetrievalDialog = (props) => {

    const { alert, info, warn } = React.useContext(AlertContext);

    const [openHeaderProp, setOpenHeaderProp] = React.useState(false);
    const [openDataProp, setOpenDataProp] = React.useState(false);
    const [openInterfsTest, setOpenInterfsTest] = React.useState(false);

    const [interfs, setInterfs] = React.useState(props.interfs);
    const [originInterfs, setOriginInterfs] = React.useState(props.interfs);

    React.useEffect(()=>{
        setInterfs(props.interfs);
        setOriginInterfs(props.interfs);
    }, [props.interfs]);

    const handleOnSubmit = () => {
        props.onClose();
        updateInterface(interfs, (resp, error)=>{
            if(error!==undefined) {
                warn({ 
                    title: "Fail to update interface", 
                    message: "Fail updating interface named " + interfs.name, 
                    modal: true 
                });            
            } else {
                info({ 
                    title: "Success to update interface", 
                    message: "Successfully updating interface named " + interfs.name, 
                    modal: false 
                });
                props.onUpdateCompleted();
            } 
        });
    }

    const handleOnInfoReset = () => {
        setInterfs(originInterfs);
    }

    const handleOnInfoUpdateApply = (value) => {
        setInterfs({
            ...interfs,
            name: value.name,
            commandClassName: value.commandClassName,
            useGenericCommandClass: value.useGenericCommandClass,
            interfaceType: value.interfaceType,
            plcName: value.plcName,
            replyName: value.replyName,
            webHookNameList: value.webHookNameList,
            description: value.description,
            use: value.use,
            sync: value.sync,
            reply: value.reply
        });
    }

    // for header props
    const handleOnHeaderPropClose = () => {
        setOpenHeaderProp(false);
    }

    const handleOnHeaderPropsUpdate = (headerProps) => {
        setInterfs({
            ...interfs,
            headerProps: headerProps
        });
    }

    const handleOnHeaderPropsReset = () => {
        setInterfs( { ...interfs, headerProps: originInterfs.headerProps });
    }

    const handleOnHeaderPropsServerApply = (headerList) => {
        // info({ 
        //     title: "Under development", 
        //     message: "Server apply is under development. No changed would be applied.", 
        //     modal: true 
        // });
        alert("Server apply is under development. No changed would be applied", true);
    }

    // for data props 
    const handleOnDataPropClose = () => {
        setOpenDataProp(false);
    }

    const handleOnDataPropsUpdate = (dataProps) => {
        setInterfs({
            ...interfs,
            dataProps: dataProps
        });
    }

    const handleOnDataPropsReset = () => {
        setInterfs( { ...interfs, dataProps: originInterfs.dataProps });
    }

    const handleOnDataPropsServerApply = (dataList) => {
        alert("Server apply is under development. No changed would be applied", true);
    }

    const handleOnInterfsTestDialogOpen = () => {
        if(interfs.interfaceType!=="READ" && interfs.interfaceType!=="WRITE") {
            info({ 
                title: "No open Interface test dialog.", 
                message: "Only READ or WRITE types are possible to open test dialog.", 
                modal: true 
            });
            return;
        }
        setOpenInterfsTest(true);
    }

    return (
        <>
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ props.onClose }
            onCancel={ props.onCancel }
            onConfirm={ handleOnSubmit }
            title={ props.title }
            confirmation={ props.confirmation }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <InterfsInfoView 
                onReset={ handleOnInfoReset }
                onUpdateApply={ handleOnInfoUpdateApply }
                interfsInfo={ interfs }
                editMode={ false }
                updatable={ true }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
                <Box>
                    <Button onClick={ ()=>setOpenHeaderProp(true) }>Header Props</Button>
                    <Button onClick={ ()=>setOpenDataProp(true) }>Data Props</Button>
                </Box>
                <Box>
                    <Button onClick={ handleOnInterfsTestDialogOpen }>연계 테스트</Button>
                </Box>
            </Box>
            
        </ConfirmationModalDialog>

        <ConfirmationModalDialog
            title="헤더정보"
            open={ openHeaderProp }
            onClose={ handleOnHeaderPropClose }
            onCancel={ handleOnHeaderPropClose }
            // onConfirm={ handleOnHeaderPropConfirm }
            setOpen={ handleOnHeaderPropClose }
            titleDivider
            actionDivider
            // confirmation
        >
            <InterfsHeaderPropListTable 
                updatable={ true }
                title="헤더" 
                onUpdate={ handleOnHeaderPropsUpdate }
                onReset={ handleOnHeaderPropsReset }
                onServerApply={ handleOnHeaderPropsServerApply }
                rows={ interfs&&interfs.headerProps }
                editMode={ false }
            />
        </ConfirmationModalDialog>

        <ConfirmationModalDialog
            title="연계 데이터 정보"
            open={ openDataProp }
            onClose={ handleOnDataPropClose }
            onCancel={ handleOnDataPropClose }
            // onConfirm={ handleOnDataPropConfirm }
            setOpen={ handleOnDataPropClose }
            titleDivider
            actionDivider
            // confirmation
        >
            <InterfsDataPropListTable
                updatable={ true }
                title="연계 데이터"
                onUpdate={ handleOnDataPropsUpdate }
                onReset={ handleOnDataPropsReset }
                onServerApply={ handleOnDataPropsServerApply }
                rows={ interfs&&interfs.dataProps }
                editMode={ false }
            />
        </ConfirmationModalDialog>

        <ConfirmationModalDialog
            title="인터페이스 동작 테스트"
            open={ openInterfsTest }
            onClose={ ()=>setOpenInterfsTest(false) }
            onCancel={ ()=>setOpenInterfsTest(false) }
            setOpen={ ()=>setOpenInterfsTest(false) }
            titleDivider
            actionDivider
        >
            <InterfsSvcTestView 
                interfs={ interfs }
            />
            
        </ConfirmationModalDialog>
        </>

    )
}

export default InterfsRetrievalDialog;