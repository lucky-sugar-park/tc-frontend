import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import { registerVplc } from './VplcApi';
import VplcInfoView from './VplcInfoView';

const emptyVplc = {
    id: "",
    name: "",
    ipAddress: "",
    manufacturer: "Samsung SDS",
    startPort: 9001,
    portCount: 4, 
    portConnLimit: 1,
    frameFormat: "BINARY",
    memTypes: [],
    status: "REGISTERED",
    description: "",
}

const VplcAddDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [values, setValues] = React.useState(emptyVplc);
    const [applied, setApplied] = React.useState(true);

    React.useEffect(()=>{
        setValues(emptyVplc);
        return ()=>{
            setValues({});
        }
    }, []);

    const handleOnClose = () => {
        props.onClose();
    }

    const handleOnReset = () => {
        setValues(emptyVplc);
    }

    const handleOnChangeApply = (plcInfo) => {
        setValues(plcInfo);
    }

    const handleOnApplied = (applied) => {
        setApplied(applied);
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
        registerVplc(values, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to register new Virtual PLC", 
                    message: "Success to register new Virtual PLC [" + values.name + "]", 
                    modal: false 
                })
                props.onAdditionCompleted();
                setValues(emptyVplc);
            } else {
                Notifier.warn({ 
                    title: "Fail to register new Virtual PLC", 
                    message: "Cause: " + error, 
                    modal: true 
                })
            }
        });
    }

    return (
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ handleOnClose }
            onCancel={ handleOnClose }
            onConfirm={ handleOnSubmit }
            title="Add New Virtual PLC"
            confirmation={true}
            setOpen={ props.handleClose }
            titleDivider
            actionDivider
        >
            <VplcInfoView 
                vplcInfo={ values }
                editMode={ true }
                updatable={ true }
                viewMode="N"
                onChangeApply={ handleOnChangeApply }
                onApplied={ handleOnApplied }
                onReset={ handleOnReset }
            />
        </ConfirmationModalDialog>
    );
}

export default VplcAddDialog;