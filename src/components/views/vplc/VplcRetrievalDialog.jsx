import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import VplcInfoView from './VplcInfoView';
import { updateVplc } from './VplcApi';

const VplcRetrievalDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [vplcInfo, setVplcInfo] = React.useState(props.vplcInfo);
    const [origVplcInfo, setOrigVplcInfo] = React.useState(props.vplcInfo);
    const [confirmation, setConfirmation] = React.useState(false);
    const [applied, setApplied] = React.useState(true);

    React.useEffect(()=>{
        setVplcInfo(props.vplcInfo);
        setOrigVplcInfo(props.vplcInfo);
    }, [props.vplcInfo]);

    const handleOnReset = () => {
        setVplcInfo(origVplcInfo);
    }

    const handleOnChangeApply = (vplc) => {
        setVplcInfo(vplc);
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
        updateVplc(vplcInfo, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to update Virtual PLC", 
                    message: "Success to update Virtual PLC [" + vplcInfo.name + "]", 
                    modal: false 
                })
                props.onUpdateCompleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to update Virtual PLC", 
                    message: "name [ "+vplcInfo.name + " ], Cause:" + error, 
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
            <VplcInfoView 
                onReset={ handleOnReset }
                onChangeApply={ handleOnChangeApply }
                onApplied={ handleOnApplied }
                vplcInfo={ vplcInfo }
                editMode={ props.editMode }
                updatable={ true }
                viewMode="R"
                onEditModeChanged={ handleOnEditModeChanged }
            />
        </ConfirmationModalDialog>
    );
}

export default VplcRetrievalDialog;