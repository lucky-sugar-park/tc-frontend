import React from 'react';

import { LongTextCommonDialogContext } from './LongTextCommonDialogContext';

export function useLongTextCommonDialog () {
    const { showLongTextCommonDialog } = React.useContext(LongTextCommonDialogContext);
    return { showLongTextCommonDialog };
}
