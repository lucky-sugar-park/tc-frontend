import axios from "axios";
// import mapToObj from "./MapConverter";

const accessTokenChannel = new BroadcastChannel("accessToken");

const listenAccessTokenChannel = (event) => {
  if(event.data.type==="ASK") {
    accessTokenChannel.postMessage({ type: "REP", val: accessToken })

  } else if(event.data.type==="REP") {
    accessToken=event.data.val;
  }
}

accessTokenChannel.addEventListener("message", listenAccessTokenChannel);

var onSecurityError = undefined;

const handleSecurityError = async (origUrl, origHeaders, origBody, onResponse) => {
  if(onSecurityError !== undefined) {
    await onSecurityError(origUrl, origHeaders, origBody, onResponse);
  }
}

// axios.interceptors.request.use((config)=>{
//   return config;
// }, (error)=>{
//   return Promise.reject(error);
// });

// axios.interceptors.response.use((response)=>{
//   return response;
// }, (error)=>{
//   return Promise.reject(error);
// });

var accessToken = undefined;

if(accessToken===undefined) {
  accessTokenChannel.postMessage({ type: "ASK" })
}

export default class RestTemplate {

  makeHeader = (headers) => {
    var headersMade = headers;
    if(headersMade===undefined || headersMade===null) {
        headersMade = {};
    }

    headersMade = {
      ...headersMade,
      "Content-Type": 'application/json;charset=UTF-8',
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Origin": `http://localhost:3000`,
      // "Authorization": sessionStorage.getItem("accessToken"),
      "Authorization": accessToken,
      // "Access-Control-Allow-Credentials": "include",
    }

    // headersMade.set("Access-Control-Allow-Origin","*");
    // headersMade.set("Accept", "application/json");
    // headersMade.set("Authorization", "Bearer " + accessToken);

    // return mapToObj(headersMade);
    return headersMade;
  }

  get = (url, onResponse, headers=new Map(), withHeader=false, isHandleSecurityError=true) => {
    var headersMade=this.makeHeader(headers);
    axios.get(url, {
        headers: headersMade,
        withCredentials: true
    }).then(response => {
        if(onResponse!==undefined) {
          if(withHeader===false) onResponse(response.data, undefined);
          else onResponse(response, undefined);
        }
    }).catch(((error)=>{
      const errorData = error.response.data;
      if(
        handleSecurityError !== undefined &&
        isHandleSecurityError && 
        (error.response.status===403 || error.response.status===401) && 
        errorData !== undefined && 
        errorData.code === "EXPIRED_TOKEN"
      ) {
        handleSecurityError(url, headers, undefined, onResponse);
      } else {
        console.error(error.message);
        onResponse({}, error)
      }
    }));
  }

  post = (url, body, onResponse, headers=new Map(), withHeader=false, isHandleSecurityError=true) => {
    var headersMade=this.makeHeader(headers);
    axios.post(url, body, {
      headers: headersMade,
      withCredentials: true
    }).then(response => {
      if(onResponse!==undefined) {
        if(withHeader=== false) onResponse(response.data, undefined);
        else onResponse(response, undefined);
      }
    }).catch(((error)=>{
      const errorData = error.response.data;
      if(
        handleSecurityError !== undefined &&
        isHandleSecurityError && 
        (error.response.status===403 || error.response.status===401) && 
        errorData !== undefined && 
        errorData.code === "EXPIRED_TOKEN"
      ) {
        handleSecurityError(url, headers, body, onResponse);
      } else {
        console.error(error.message);
        onResponse({}, error)
      }
    })) 
  }

  postAsSync = async (url, body, headers=new Map(), isHandleSecurityError=true) => {
    var headersMade = this.makeHeader(headers);
    try {
      const response = await axios.post(url, body, { headers: headersMade, withCredentials: true });
      return response;
    } catch (error) {
      const errorData = error.response.data;
      if(
        handleSecurityError !== undefined &&
        isHandleSecurityError && 
        (error.response.status===403 || error.response.status===401) && 
        errorData !== undefined && 
        errorData.code === "EXPIRED_TOKEN"
      ) {
        handleSecurityError(url, headers, body, undefined);
      } else {
        throw error;
      }
    }    
  }
  
  getAsSync = async (url, headers=new Map(), isHandleSecurityError=true) => {
    var headersMade = this.makeHeader(headers);
    try {
      const response = await axios.get(url, { headers: headersMade, withCredentials: true });
      return response;
    } catch (error) {
      const errorData = error.response.data;
      if(
        handleSecurityError !== undefined &&
        isHandleSecurityError && 
        (error.response.status===403 || error.response.status===401) && 
        errorData !== undefined && 
        errorData.code === "EXPIRED_TOKEN"
      ) {
        handleSecurityError(url, headers, undefined, undefined);
      } else {
        throw error;
      }
    }
  }
}

const restTemplate = new RestTemplate();

export const createRestTemplate = () => {
  return restTemplate;
}

export const registerSecurityErrorHandler = ( securityErrorHandler ) => {
  onSecurityError = securityErrorHandler;
}

export const updateAccessToken = async (newAccessToken) => {
  // sessionStorage.setItem("accessToken", newAccessToken);
  accessToken = newAccessToken;
  accessTokenChannel.postMessage({ type: "REP", val: accessToken })
}

export const getAccessToken = async () => {
  // return sessionStorage.getItem("accessToken");
  return accessToken;
}