import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { CookiesProvider  } from 'react-cookie';

import { store, persistor } from '../store';
import themeList from './themes';
import UIComposer from './UIComposer';

import { getImessageBroker } from '../utils/InternalMessageBroker';
import getServerPushEventDispatcher from '../utils/ServerPushEventDisparcher';

import { AlertContextProvider } from '../components/widgets/dialogs/AlertContext';
import ConfirmContextProvider from '../components/widgets/dialogs/ConfirmContext';
import LongTextCommonDialogContextProvider from '../components/widgets/dialogs/LongTextCommonDialogContext';

const PutTogether = (props) => {

    const [themes, setThemes] = React.useState(themeList);
    const [selectedThemeInfo, setSelectedThemeInfo] = React.useState(themeList[0]);

    const handleThemeSelectionChanged = (themeName) => {
        for(var i = 0; i < themes.length; i++) {
            const theme = themes[i];
            if(theme.name === themeName) {
                setSelectedThemeInfo(theme);
                break;
            }
        }
    }

    React.useEffect(()=>{
        setThemes(themeList);
        
        var tname = localStorage.getItem("settings.theme");
        var themeSelected = undefined;
        if(tname!=null) {
            for(var i=0; i<themeList.length; i++) {
                const theme = themeList[i];
                if(tname === theme.name) {
                    themeSelected = theme;
                    break;
                }
            }
        }
        
        if(themeSelected !== undefined) {
            setSelectedThemeInfo(themeSelected);
        }
        // 서버로부터의 이벤트 수신을 위한 sse를 준비시킴
        getServerPushEventDispatcher();
        const imessageBroker=getImessageBroker();
        imessageBroker.addListener("THEME_SETTINGS", {
            name: "THEME_CHANGE_HANDLER",
            onMessage: (message)=>{
                handleThemeSelectionChanged(message.themeName);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <ThemeProvider theme={ selectedThemeInfo.theme }>
                <BrowserRouter>
                    <CssBaseline/>
                    <Provider store={ store }>
                        <PersistGate loading={ null } persistor={ persistor }>
                            <CookiesProvider>
                            <AlertContextProvider position={{ right: 0, top: 60 }} width="600px">
                                <ConfirmContextProvider>
                                    <LongTextCommonDialogContextProvider>
                                        <UIComposer 
                                            themes = { themes }
                                            selectedThemeInfo = { selectedThemeInfo }
                                            onThemeSelectionChanged = { handleThemeSelectionChanged }
                                            drawerWidth={ 280 }
                                        />
                                    </LongTextCommonDialogContextProvider>
                                </ConfirmContextProvider>
                            </AlertContextProvider>
                            </CookiesProvider>
                        </PersistGate>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default PutTogether;