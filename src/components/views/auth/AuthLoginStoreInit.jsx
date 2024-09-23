import { addReducer, store } from "../../../store";
import { createPromiseThunk, handleAsyncActions } from "../../../store/redux-thunk-utils";
import { login as doLogin, logout as doLogout } from './AuthApi';

let inited=false;

const INIT  = "AUTH/init";
const INIT_SUCCESS = "AUTH/init_SUCCESS";
const LOGIN = 'AUTH/login';
const LOGIN_SUCCESS = 'AUTH/login_SUCCESS';
const LOGOUT = 'AUTH/logout';
const LOGOUT_SUCCESS = 'AUTH/logout_SUCCESS';

export const login = createPromiseThunk(LOGIN, async (credential)=>{
    var loginResponse = undefined;
    try {
        loginResponse = await doLogin(credential.email, credential.password);
    } catch (error) {
        console.log(error);
        alert("Fail to login. Cause : " + error.message);
    } finally {
        return {
            logined: loginResponse.result,
            user: {
                id: loginResponse.userInfo.id,
                password: loginResponse.userInfo.password,
                name: loginResponse.userInfo.name,
                email: loginResponse.userInfo.email,
                phone: loginResponse.userInfo.phone,
                extraInfo: loginResponse.userInfo.extraInfo,
                roles: loginResponse.userInfo.userRoles
            }
        }
    }
});
export const logout = createPromiseThunk(LOGOUT, async (id)=>{
    try {
        await doLogout(id);
    } catch (error) {
        console.log(error);
    } finally {
        return {
            logined: false,
            user: {
                id: "",
                name: "",
                email: "",
                password: "",
                phone: "",
                extraInfo: "",
                roles: []
            }
        }
    }
});
export const init = createPromiseThunk(INIT, (authInfo=undefined)=>{
    if(authInfo===undefined) {
        return {
            logined: false,
            user: {
                id: "",
                name: "",
                email: "",
                password: ""
            }
        }
    } else {
        return authInfo;
    }

});

const initialState = {
    loginInfo: {
        error: null,
        loading: false,
        data: {
            logined: false,
            user: {
                id: "",
                name: "",
                email: "",
                password: ""
            }
        }
    }
}

export function auth(state=initialState, action) {
    switch(action.type) {
        case INIT:
        case INIT_SUCCESS:
            const initAuthReducer=handleAsyncActions(INIT, 'loginInfo', true);
            return initAuthReducer(state, action);
        case LOGIN:
        case LOGIN_SUCCESS:
            const loginAuthReducer=handleAsyncActions(LOGIN, 'loginInfo', true);
            return loginAuthReducer(state, action);
        case LOGOUT:
        case LOGOUT_SUCCESS:
            const logoutAuthReducer=handleAsyncActions(LOGOUT, 'loginInfo', true);
            return logoutAuthReducer(state, action);
        default:
            return state;
    }
}

const initStore = () => {
    if(inited===true) return;
    inited=true;
    // store.reducerManager.add("auth", auth);
    addReducer("auth", auth);
}

export default initStore;