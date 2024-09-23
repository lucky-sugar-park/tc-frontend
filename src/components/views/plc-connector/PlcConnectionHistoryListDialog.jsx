import React from 'react';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import PlcConnectionHistoryListTableView from './PlcConnectionHistoryListTableView';

const PlcConnectionHistoryListDialog = (props) => {

    return (
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ props.onClose }
            onCancel={ props.onCancel }
            title={ "PLC 커넥션 이력 ( ID: " + props.plcConId + " )" }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <PlcConnectionHistoryListTableView 
                plcConId={ props.plcConId }
            />
        </ConfirmationModalDialog>
    )
}

export default PlcConnectionHistoryListDialog;