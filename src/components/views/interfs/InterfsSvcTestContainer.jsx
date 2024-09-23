import React from 'react';

import InterfsSvcTestView from './InterfsSvcTestView';
import InterfsRetrievalDialog from './InterfsRetrievalDialog';

const InterfsSvcTestContainer = (props) => {

    const [interfsRetrievalDialogOpen, setInterfsRetrievalDialogOpen] = React.useState(false);
    const [retrievalInterfs, setRetrievalInterfs] = React.useState(undefined);

    const handleOnInterfaceChange = (interfs) => {
        setRetrievalInterfs(interfs)
    }

    const handleOnInterfsRetrievalDialogOpen = () => {
        setInterfsRetrievalDialogOpen(true);
    }

    return (
        <>
            <InterfsSvcTestView 
                onInterfsChange={ handleOnInterfaceChange }
                onInterfsRetrievalDialogOpen={ handleOnInterfsRetrievalDialogOpen }
            />
            <InterfsRetrievalDialog 
                title="인터페이스 정보"
                open={ interfsRetrievalDialogOpen }
                onClose={ ()=>setInterfsRetrievalDialogOpen(false) }
                onCancel={ ()=>setInterfsRetrievalDialogOpen(false) }
                interfs={ retrievalInterfs }
            />
        </>
    )
}

export default InterfsSvcTestContainer;