import React from 'react';

import LongTextCommonDialog from './LongTextCommonDialog';

export const LongTextCommonDialogContext = React.createContext({
    showLongTextCommonDialog: ()=>{}
});

const LongTextCommonDialogContextProvider = ({ children }) => {

    const [longTextCommonDialogList, setLongTextCommonDialogList] = React.useState([]);

    React.useEffect(()=>{
    }, []);

    const hideLongTextCommonDialog = (id) => {
        setLongTextCommonDialogList((list)=>{
            const index=list.findIndex(({ id: _id })=>id===_id);
            return [ ...list.slice(0, index), ...list.slice(index+1)];
        });
    };

    const showLongTextCommonDialog = ({ title, text, kind, isOpen, editMode, onConfirm }) => {
        const handleOnConfirm = (id, text, kind) => {
            hideLongTextCommonDialog(id);
            onConfirm(text, kind);
        };

        const id=Symbol();
        setLongTextCommonDialogList((list)=>[
            ...list,
            {
                id: id,
                title: title,
                text: text,
                kind: kind,
                isOpen: isOpen,
                editMode: editMode,
                onCancel: ()=>hideLongTextCommonDialog(id),
                onConfirm: onConfirm && handleOnConfirm
            }
        ]);
    }

    return (
        <LongTextCommonDialogContext.Provider value={{ showLongTextCommonDialog }}>
            { children }
            { longTextCommonDialogList&&longTextCommonDialogList.map((item, index)=>{
                return (
            
            <LongTextCommonDialog 
                id={ item.id }
                seq={ index }
                title={ item.title }
                text={ item.text }
                kind={ item.kind }
                editMode={ item.editMode }
                isOpen={ item.isOpen }
                onCancel={ item.onCancel }
                onConfirm={ item.onConfirm }
            />

                )
            })}
        </LongTextCommonDialogContext.Provider>
    )
}

export default LongTextCommonDialogContextProvider;