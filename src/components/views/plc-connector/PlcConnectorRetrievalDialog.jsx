import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import PlcConnectorInfoView from './PlcConnectorInfoView';
import { updatePlcConnector } from './PlcConnectorApi';

const PlcConnectorRetrievalDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [plcConInfo, setPlcConInfo] = React.useState(props.plcConInfo);
    const [origPlcConInfo, setOrigPlcConInfo] = React.useState(props.plcConInfo);
    const [confirmation, setConfirmation] = React.useState(false);
    const [applied, setApplied] = React.useState(true);

    React.useEffect(()=>{
        setPlcConInfo(props.plcConInfo);
        setOrigPlcConInfo(props.plcConInfo);
    }, [props.plcConInfo]);

    const handleOnReset = () => {
        setPlcConInfo(origPlcConInfo);
    }

    const handleOnChangeApply = (plcCon) => {
        setPlcConInfo(plcCon);
    }

    const handleOnApplied = () => {
        setApplied(true);
    }

    const handleOnSubmit = () => {
        if(applied===false) {
            Notifier.warn({
                title: "No change applied.", 
                message: "Change should be applied before confirm. Please push apply button.", 
                modal: true
            });
            return;
        }

        props.onClose();
        updatePlcConnector(plcConInfo, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to update PLC Connector", 
                    message: "Success to update PLC [" + plcConInfo.name + "]", 
                    modal: false 
                })
                props.onUpdateCompleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to update PLC Connector", 
                    message: "name [ "+plcConInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnEditModeChanged = (editMode) => {
        setConfirmation(editMode);
    }

    return (
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ props.onClose }
            onCancel={ props.onCancel }
            onConfirm={ handleOnSubmit }
            title={ props.title }
            confirmation={ confirmation }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <PlcConnectorInfoView 
                onReset={ handleOnReset }
                onChangeApply={ handleOnChangeApply }
                onApplied={ handleOnApplied }
                plcConInfo={ plcConInfo }
                editMode={ props.editMode }
                updatable={ true }
                onEditModeChanged={ handleOnEditModeChanged }
            />
        </ConfirmationModalDialog>
    )
}

export default PlcConnectorRetrievalDialog;