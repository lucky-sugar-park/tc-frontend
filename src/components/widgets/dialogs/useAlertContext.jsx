import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

export function useAlertContext () {
    const value=React.useContext(AlertContext);
    if(value===undefined) {

    }
    return value;
}