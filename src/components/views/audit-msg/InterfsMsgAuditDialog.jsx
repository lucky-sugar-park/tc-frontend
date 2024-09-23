import React from 'react';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import InterfsMessageAuditDataGrid from './InterfsMsgAuditDataGrid';

const InterfsMessageAuditListDialog = (props) => {

    const [open, setOpen] = React.useState(props.open);

    React.useEffect(()=>{
        setOpen(props.open); 
    }, [props.open]);

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
            title="Interface Message Audit History"
            confirmation={ false }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <InterfsMessageAuditDataGrid 
                interfsName={ props.interfsName }
                { ...props } 
            />
        </ConfirmationModalDialog>
    )
}

export default InterfsMessageAuditListDialog;