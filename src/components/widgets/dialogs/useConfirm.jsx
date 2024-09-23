import React from 'react';

import { ConfirmContext } from './ConfirmContext';

export function useConfirm () {
    const { confirm } = React.useContext(ConfirmContext);
    return { confirm };
}
