import React from 'react';

import ConfirmModalDialog from './ConfirmModalDialog.jsx';

export const ConfirmContext = React.createContext({
    confirm: () => {},
});

const ConfirmContextProvider = ({ children }) => {

    const [confirmList, setConfirmList] = React.useState([]);

    React.useEffect(()=>{
    }, []);

    const hideConfirm = (id) => {
        setConfirmList((list)=>{
            const index=list.findIndex(({ id: _id })=>id===_id);
            return [ ...list.slice(0, index), ...list.slice(index+1)];
        });
    };

    const confirm=({ title, message, buttons })=>{
        const promise = new Promise((resolve, reject)=>{
            const id=Symbol();
            setConfirmList((list)=>[
                ...list,
                {
                    id: id,
                    isOpen: true,
                    title: title,
                    message: message,
                    buttons: {
                        ok: {
                            text: buttons.ok,
                            click: ()=>resolve(id)
                        },
                        close: {
                            text: buttons.close,
                            click: ()=>hideConfirm(id)
                        },
                        ...(buttons?.cancel && {
                            cancel: {
                                text: buttons.cancel,
                                click: ()=> reject(id)
                            }
                        })
                    }
                }
            ]);
        });

        return promise.then (
            (id)=>{
                hideConfirm(id);
                return true;
            },
            (id)=>{
                hideConfirm(id);
                return false;
            }
        );
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            { children }
            { confirmList&&confirmList.map((item, index)=>{
                return (
            
            <ConfirmModalDialog 
                id={ item.id }
                seq={ index }
                title={ item.title }
                message={ item.message }
                buttons={ item.buttons }
                isOpen={ item.isOpen }
            />

                )
            })}
        </ConfirmContext.Provider>
    )
}

export default ConfirmContextProvider;