import React from 'react';

import { getImessageBroker } from '../../../utils/InternalMessageBroker';
import { DecoratedAlert } from './Alert'

export const AlertContext = React.createContext({
    notifier: {},
    alert: () => {},
    success: () => {},
    info: () => {},
    warn: () => {},
    error: () => {}
})

export const AlertContextProvider = ({ children, position, width }) => {

    const [infos, setInfos] = React.useState([]);

    // settings에 따라서 alert 창이 일정 시간 경과 후에, 사라지도록 해야 함 (no-modal의 경우)
    const [settings, setSettings] = React.useState(undefined);

    React.useEffect(()=>{
        const imessageBroker=getImessageBroker();
        imessageBroker.addListener("ALERT_SETTINGS", {
            name: "ALERT_HANDLER",
            onMessage: (message)=>{
                setSettings(message.settings);
            }
        });
    }, []);
   
    const set = (title, message, severity, modal) => {
        top=position.top;
        setInfos([ ...infos, {
            title: title,
            message: message,
            severity: severity,
            isModal: modal,
            isOpen: true,
            position: { 
                right: position.right,
                top: position.top
            }
        }]);
    }

    React.useEffect(()=>{
    }, []);

    const Notifier = {

        alert (message, modal=false) {
            set (undefined, message, "info", modal);
        },

        success ({ title, message, modal=false }) {
            set (title, message, "success", modal);
        },

        info({ title, message, modal=false }) {
            set (title, message, "info", modal);
        },

        warn({ title, message, modal=false }) {
            set (title, message, "warning", modal);
        },

        error({ title, message, modal=false }) {
            set (title, message, "error", modal);
        }
    }

    const alert = ( message, modal=false ) => {
        set ("Alert", message, "alert", modal);
    }

    const success = ({ title, message, modal=false }) => {
        set (title, message, "success", modal);
    }

    const info = ({ title, message, modal=false }) => {
        set (title, message, "info", modal);
    }

    const warn = ({ title, message, modal=false }) => {
        set (title, message, "warning", modal);
    }

    const error = ({ title, message, modal=false }) => {
        set (title, message, "error", modal);
    }

    const handleOnClose = (event, index) => {
        top=position.top;
        setInfos(infos.filter((info, idx)=>index!==idx));
    }

    const handleOnCloseAll = () => {
        // top=position.top
        setInfos(infos.filter((info,index)=>info.isModal===true));
    }

    let top=position.top;

    return (
        <AlertContext.Provider
            value={{ Notifier, alert, success, info, warn, error }}
        >
            { children }
            {
                infos.map((info, index)=>{
                    info.position.top=top;
                    top+=(infos[index].modal===true ? 0 : infos[index].title!==undefined && ""!==infos[index].title ? 77 : 50)
                    return (
                        <DecoratedAlert
                            idx={ index }
                            title={ info.title }
                            message={ info.message }
                            severity={ info.severity }
                            isOpen={ info.isOpen }
                            isModal={ info.isModal }
                            onClose={ handleOnClose }
                            onCloseAll={ handleOnCloseAll }
                            position={ info.position }
                            width={ width }
                        />
                    )
                })
            }
        </AlertContext.Provider>
    )
}