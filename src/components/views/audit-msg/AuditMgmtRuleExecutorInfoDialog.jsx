import React from 'react';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import AuditMsgMgmtRuleCreationUpdateView from './AuditMsgMgmtRuleCreationUpdateView' ;

const AuditMgmtRuleExecutorInfoDialog = (props) => {

    const [open, setOpen] = React.useState(props.open);

    React.useEffect(()=>{
        setOpen(props.open); 
    }, [props.open])

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    }

    const handleOK = () => {
        setOpen(false);
        props.onClose();
    }

    return (
        <ConfirmationModalDialog
            open={ open }
            onClose={ handleClose }
            onCancel={ handleClose }
            onConfirm={ handleOK }
            title="Audit Message Management Rule Executor Information"
            confirmation={ false }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <AuditMsgMgmtRuleCreationUpdateView { ...props } />
        </ConfirmationModalDialog>
    )
}

export default AuditMgmtRuleExecutorInfoDialog;