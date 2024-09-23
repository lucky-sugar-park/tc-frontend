import { createRestTemplate } from '../../../utils/RestTemplate';

const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;

const restTemplate=createRestTemplate();

export const searchInterface = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/search";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    restTemplate.post(url, searchCondition, onResponse);
}

export const applyInterfsUse = (id, use, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/update/apply-use/"+id+"/"+use;
    restTemplate.get(url, onResponse);
}

export const applyInterfsUseByBatch = (ids, use, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/update/apply-use/byBatch/"+use;
    restTemplate.post(url, ids, onResponse);
}

export const registerInterface = (interfsInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/register";
    restTemplate.post(url, interfsInfo, onResponse);
}

export const updateInterface = (interfsInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/update";
    restTemplate.post(url, interfsInfo, onResponse);
}

export const searchHeaderTemplates = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/search/header-templates/by-all";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    restTemplate.get(url, onResponse);
}

export const findInterfaceByName = (interfsName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/find/byName/"+interfsName;
    restTemplate.get(url, onResponse);
}

export const deleteInterfaceById = (id, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/delete/"+id;
    restTemplate.get(url, onResponse);
}

export const deleteInterfaceByName = (name, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/delete/byName/"+name;
    restTemplate.get(url, onResponse);
}

export const deleteInterfaceByBatch = (ids, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/management/delete/byBatch";
    restTemplate.post(url, ids, onResponse);
}

export const sendIfsvcRequest = (tcMessageRequest, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/request";
    restTemplate.post(url, tcMessageRequest, onResponse);
}

export const sendIfsvcRequestAndReply = (tcMessageRequest, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/request-and-reply";
    restTemplate.post(url, tcMessageRequest, onResponse);
}