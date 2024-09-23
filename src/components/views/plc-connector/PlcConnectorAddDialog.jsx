import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import { registerPlcConnector } from './PlcConnectorApi';
import PlcConnectorInfoView from './PlcConnectorInfoView';

const emptyPlcConnector = {
    name: "",
    hostIp: "",
    manufacturer: "Samsung SDS",
    published: false,
    startPort: 9001,
    portCount: 4, 
    ports: [],
    portConnLimit: 1,
    connectionVips:[],
    messageFrameFormat: "BINARY",
    memTypes: [],
    status1: "REGISTERED",
    status2: "CONNECTION_TEST_NONE",
    adapterClassName: "com.mymes.equip.tc.plc.connector.melsec.MelsecProgrammableControllerAdapter",
    commProtocolHeadersReqTemplate: {},
    commProtocolHeadersResTemplate: {},
    asyncRequestUse: "false",
    asyncTimerStartDelay: 1000,
    asyncTimerRunInterval: 1000,
    description: "",
}

const PlcConnectorAddDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [values, setValues] = React.useState(emptyPlcConnector);
    const [applied, setApplied] = React.useState(true);

    React.useEffect(()=>{
        setValues(emptyPlcConnector);
        return ()=>{
            setValues({});
        }
    }, []);

    const handleOnClose = () => {
        props.onClose();
    }

    const handleOnReset = () => {
        setValues(emptyPlcConnector);
    }

    const handleOnChangeApply = (plcConInfo) => {
        setValues(plcConInfo);
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
        registerPlcConnector(values, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to register new PLC Connector", 
                    message: "Success to register new PLC Connector [" + values.name + "]", 
                    modal: false 
                })
                props.onAdditionCompleted();
                setValues(emptyPlcConnector);
            } else {
                Notifier.warn({ 
                    title: "Fail to register new PLC Connector", 
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
            title="Add New PLC Connector"
            confirmation={true}
            setOpen={ props.handleClose }
            titleDivider
            actionDivider
        >
            <PlcConnectorInfoView 
                plcConInfo={ values }
                editMode={ true }
                updatable={ true }
                onChangeApply={ handleOnChangeApply }
                onApplied={ handleOnApplied }
                onReset={ handleOnReset }
            />
        </ConfirmationModalDialog>
    )
}

export default PlcConnectorAddDialog;