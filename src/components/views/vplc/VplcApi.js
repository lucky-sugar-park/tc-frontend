import { createRestTemplate } from '../../../utils/RestTemplate';

const restTemplate=createRestTemplate();

const BASE_URL_SERVER_VPLC = process.env.REACT_APP_URL_SERVER_VPLC;

export const registerVplc = (vplcInfo, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/register";
    restTemplate.post(url, vplcInfo, onResponse);
}

export const updateVplc = (vplcInfo, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/update";
    restTemplate.post(url, vplcInfo, onResponse);
}

export const publishVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/publish/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const releaseVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/release/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const deleteVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/delete/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const searchVirtualPlcByAll = (onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/search";
    restTemplate.get(url, onResponse);
}

export const searchVirtualPlc = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/search";
    restTemplate.post(url, searchCondition, onResponse);
}

export const findVirtualPlc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/find/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const findVirtualPlcByName = (vplcName, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/management/find/byName/"+vplcName;
    restTemplate.get(url, onResponse);
}

export const readVirtualPlcMemory = (readRequest, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/manipulation/read";
    restTemplate.post(url, readRequest, onResponse);
}

export const writeVirtualPlcMemory = (writeRequest, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/manipulation/write";
    restTemplate.post(url, writeRequest, onResponse);
}

export const clearAllVirtualPlcMemory = (clearAllRequest, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/manipulation/clear/all";
    restTemplate.post(url, clearAllRequest, onResponse);
}

export const startVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/start/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const startVplcByName = (vplcName, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/start/byName/"+vplcName;
    restTemplate.get(url, onResponse);
}

export const stopVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/stop/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const stopVplcByName = (vplcName, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/stop/byName/"+vplcName;
    restTemplate.get(url, onResponse);
}

export const pauseVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/pause/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const pauseVplcByName = (vplcName, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/pause/byName/"+vplcName;
    restTemplate.get(url, onResponse);
}

export const resumeVplc = (vplcId, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/resume/"+vplcId;
    restTemplate.get(url, onResponse);
}

export const resumeVplcByName = (vplcName, onResponse) => {
    var url=BASE_URL_SERVER_VPLC+"/api/v1/vplc/control/resume/byName"+vplcName;
    restTemplate.get(url, onResponse);
}