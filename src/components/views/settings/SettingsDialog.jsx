import React from 'react';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import SettingsView from './SettingsView';

const SettingsDialog = (props) => {

  const handleClose = () => {
    props.handleClose(false);
  };

  return (
    <ConfirmationModalDialog
      open={props.open}
      onClose={ handleClose }
      onCancel={ handleClose }
      title="Settings"
      setOpen={ props.handleClose }
      titleDivider
    >
      <SettingsView 
        { ...props }
      />
    </ConfirmationModalDialog>
  )
}

export default SettingsDialog;