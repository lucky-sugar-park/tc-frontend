import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { History } from '../utils/HistoryHelper';
import AuthenticatedPageRoot from './AuthenticatedPageRoot';
import UnauthenticatedPageRoot from './UnauthenticatedPageRoot';
import { init } from '../components/views/auth/AuthLoginStoreInit';

const logggedInChannel = new BroadcastChannel("loggedIn");

const UIComposer = (props) => {

    // init custom history object to allow navigation from anywhere in the react app (inside or outside components)
    History.naviagte=useNavigate();
    History.location=useLocation();

    const dispatch = useDispatch();
    const initAuth = (auth) => dispatch(init(auth));

    const authInfo = useSelector(state=>state.auth);

    if(authInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) {
        logggedInChannel.postMessage({ type: "ASK" });
    }
    const [authenticated, setAuthenticated] = React.useState(
        (authInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) ? false : true
    );

    React.useEffect(()=>{
        function listenLoggedInAsk (event) {
            if(event.data.type==="ASK") {
                logggedInChannel.postMessage({ type: "REP", val: authInfo.loginInfo.data });
            } else if(event.data.type==='REP') {
                if(event.data.val!==undefined) {
                    initAuth(event.data.val);
                }
            }
        }
        logggedInChannel.addEventListener("message", listenLoggedInAsk);
        return ()=>{
            logggedInChannel.removeEventListener("message", listenLoggedInAsk);
        }
    })

    React.useEffect(()=>{
        setAuthenticated( (authInfo === undefined || authInfo.loginInfo.data === undefined || authInfo.loginInfo.data.logined === false) ? false : true);
    }, [authInfo]);
 
    return (
        <div style={{ height: "100%", width: "100%" }}>
            { authenticated === true 
            ?
            <AuthenticatedPageRoot { ...props } /> 
            :
            <UnauthenticatedPageRoot { ...props } />
            }
        </div>
    )
}

export default UIComposer;