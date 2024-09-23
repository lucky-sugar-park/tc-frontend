import React from 'react';

import {
    Box,
    Button,
    Typography
} from '@mui/material';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { registerInterface } from './InterfsApi';
import SimpleHorizontalStepperDialog from '../../widgets/dialogs/SimpleHorizontalStepperDialog';
import InterfsInfoView from './InterfsInfoView';
import InterfsDataPropListTable from './InterfsDataPropListTable';
import InterfsHeaderPropListTable from './InterfsHeaderPropListTable';

const emptyInterfs = {
    id: "",
    name: "",
    commandClassName: "com.mymes.equip.tc.dispatcher.GenericMessageCommand",
    useGenericCommandClass: true,
    replyName: "",
    plcName: "",
    interfaceType: "",
    use: true,
    dataLength: 8,
    sync: true,
    reply: true,
    description: "",
    webHookNameList: [],
    headerProps: [],
    dataProps: [],
}

const InterfsAddDialog = (props) => {

    const { info, warn } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [interfs, setInterfs] = React.useState(emptyInterfs);
    const [originInterfs, setOriginInterfs] = React.useState(emptyInterfs);

    React.useEffect(()=>{
        setInterfs(emptyInterfs);
        setOriginInterfs(emptyInterfs);
    }, []);

    React.useEffect(()=>{
        setOpen(props.open);
    }, [props.open]);

    const handleOnClose = () => {
        setOpen(false);
        props.onClose();
    }

    const handleOnDataPropsUpdate = (dataProps) => {
        setInterfs({
            ...interfs,
            dataProps: dataProps
        });
    }

    const handleOnHeaderPropsUpdate = (headerProps) => {
        setInterfs({
            ...interfs,
            headerProps: headerProps
        });
    }

    const handleOnHeaderPropsServerApply = () => {
        // should be implemented later
    }

    const handleOnDataPropsServerApply = () => {
        // should be implemented later
    }


    const handleOnDataPropsReset = () => {
        setInterfs( { ...interfs, dataProps: originInterfs.dataProps });
    }

    const handleOnHeaderPropsReset = () => {
        setInterfs( { ...interfs, headerProps: originInterfs.headerProps });
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

    const handleOnInfoReset = () => {
        setInterfs(originInterfs);
    }

    const handleOnSubmit = () => {
        setOpen(false);
        props.onClose();
        registerInterface(interfs, (resp, error)=>{
            if(error!==undefined) {
                warn({ 
                    title: "Fail to add new interface", 
                    message: "Fail adding new interface named " + interfs.name, 
                    modal: true 
                });            
            } else {
                info({ 
                    title: "Success to add new interface", 
                    message: "Successfully addes new interface named " + interfs.name, 
                    modal: false 
                });
                props.onAdditionCompleted();
            } 
        });
    }

    const InterfsInfoStep = () => {
        return (
            <InterfsInfoView 
                onReset={ handleOnInfoReset }
                onUpdateApply={ handleOnInfoUpdateApply }
                interfsInfo={ interfs }
                editMode={ true }
                updatable={ true }
            />
        );
    }

    const HeaderPropStep = () => {
        return (
            <InterfsHeaderPropListTable 
                title="헤더정보" 
                onUpdate={ handleOnHeaderPropsUpdate }
                onReset={ handleOnHeaderPropsReset }
                onServerApply={ handleOnHeaderPropsServerApply }
                rows={ interfs.headerProps }
                mode="NEW"
                editMode={ true }
                updatable={ true }
            />
        )
    }

    const DataPropStep = () => {
        return (
            <InterfsDataPropListTable 
                title="연계 데이터 정보"
                onUpdate={ handleOnDataPropsUpdate }
                onReset={ handleOnDataPropsReset }
                onServerApply={ handleOnDataPropsServerApply }
                rows={ interfs.dataProps }
                mode="NEW"
                editMode={ true }
                updatable={ true }
            />
        )
    }

    const DataCheckStep = () => {
        return (
            <Box>
                <Typography variant="h7">입력 데이타 (JSON 포맷)</Typography>
                <Typography variant="body1" gutterBottom noWrap={ true }>
                    <pre><code>{ JSON.stringify(interfs, null, 2) }</code></pre>
                </Typography>
            </Box>
        )
    }
    const steps = [
        { label: "IF Info", step: InterfsInfoStep() },
        { label: "Header Props",  step: HeaderPropStep() },
        { label: "Data Props",  step: DataPropStep() },
        { label: "Input Data Check",  step: DataCheckStep() }
    ]

    return (
        <SimpleHorizontalStepperDialog
            open={ open }
            onClose={ handleOnClose }
            onCancel={ handleOnClose }
            onConfirm={ handleOnSubmit }
            title="Interface_Addition"
            confirmation={ true }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
            steps={ steps }
            height="450px"
            width="500px"
        />
    )
}

export default InterfsAddDialog;