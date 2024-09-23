import { createRestTemplate, updateAccessToken, registerSecurityErrorHandler } from '../../../utils/RestTemplate';
import { store } from '../../../store';
import { History as history } from '../../../utils/HistoryHelper';
import { Queue } from '../../../utils/InternalMessageBroker';
import { init } from './AuthLoginStoreInit';

const restTemplate=createRestTemplate();
const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;
const EMPTY = "";

const reissueQue = new Queue();
var isRun = false;
var tokenCreated  = false;
export const pushReissueItem = (url, header, body, onResponse) => {
    reissueQue.add({
        origUrl: url,
        origHeader: header,
        origBody: body,
        origOnResponse: onResponse
    });

    if(!isRun) {
        runReissue();
        isRun = true;
    }
}

export const runReissue = () => {
    if(isRun) return;

    isRun = true;
    const handler=setTimeout(async ()=>{
        while(reissueQue.size()>0) {
            const reissueItem = await reissueQue.pop();
            await reissue(reissueItem.origUrl, reissueItem.origHeader, reissueItem.origBody, reissueItem.origOnResponse);
        }
        clearTimeout(handler);
    }, 450);
    isRun = false;
    tokenCreated = false;
}

/**
 * 로그인 성공하면 accesstoken 저장 (전역변수-보안이슈) 후 사용자 정보 리턴
 * 로그아웃 실패하면 error throw
 * 
 * @param {*} id 
 * @param {*} password 
 * @returns 
 */
export const login = async (id, password) => {
    const url=BASE_URL_SERVER_TC+"/auth/login";
    const body = {
        id: id,
        password: password
    }
    const response = await restTemplate.postAsSync(url, body);
    const accessToken  = response.headers.authorization;
    updateAccessToken(accessToken);
    return response.data;
}

/**
 * 로그아웃 성공하면 accesstoken 제거 후에 결과 리턴
 * 로그아웃 실패하면 alert 창 보여주고, 로그인 화면으로 (사용자가 로그아웃을 원했으므로 강제 로그라웃함)
 * 
 * @param {*} id 
 * @returns  { code: 200, result: "OK" }
 */
export const logout = async (id) => {
    const url=BASE_URL_SERVER_TC+"/auth/logout";
    const body = {
        id: id
    }
    try {
        await restTemplate.postAsSync(url, body);
        updateAccessToken(EMPTY);
    } catch (error) {
        console.log(error.toJson());
        console.warn("Loguot failed but handle request as logout for it is user's request.");
    }

    return {
        code: 200,
        result: "OK"
    }
}

// var tokenCreated = false;

/**
 * 모든 restTemplate 함수 처리중 401 에러 + accessTokenExpired 이면 호출되는 함수
 * accessToken과 refreshToken를 재 발급 받은 후에, 이전 수행하던 restTemplate 함수를 다시 호출함
 * reissue 성공하면 이전 진행 중인 프로세스를 계속 진행하고, 실패하면 alert 후에 로그인 페이지로 되돌려야 함
 * 
 * @param {*} origUrl 
 * @param {*} origHeader 
 * @param {*} origBody 
 * @param {*} origOnResponse 
 */
const reissue = async (origUrl, origHeader, origBody, origOnResponse) => {
    // /auth/reissue 주소를 호출할 때에는 웹 브라우저에 의해서 Cookie에 저장된 refreshToken이 자동으로 Header에 포함됨 
    const url = BASE_URL_SERVER_TC+"/auth/reissue";
    try{
        if(tokenCreated===false) {
            const response = await restTemplate.postAsSync(url, {}, {}, false);
            const accessToken  = response.headers.authorization;
            await updateAccessToken(accessToken);
            tokenCreated=true;
        }

        if(origOnResponse===undefined) {
            if(origBody===undefined) {
                return restTemplate.getAsSync(origUrl, origHeader, false);
            } else {
                return restTemplate.postAsSync(origUrl, origBody, origHeader, false);
            }
        } else {
            if(origBody===undefined) {
                // 마지막 인자 false로 지정해서 혹시모를 무한루프를 방지함
                restTemplate.get(origUrl, origOnResponse, origHeader, false, false);
            } else {
                // 마지막 인자를 false로 지정해서 혹시모를 무한루프를 방지함
                restTemplate.post(origUrl, origBody, origOnResponse, origHeader, false, false);
            }
        }
    } catch (error) {
        // reissue에 실패하면, 기존 인증을 무효화하고 로그인 화면으로 되돌아 감
        alert("Authorization Fail becasuse of token expiration, Please re-login.", error);
        store.dispatch(init());
        history.naviagte("/");
    }
}

registerSecurityErrorHandler( pushReissueItem );
