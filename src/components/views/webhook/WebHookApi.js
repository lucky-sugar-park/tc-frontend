import { createRestTemplate } from '../../../utils/RestTemplate';

const restTemplate=createRestTemplate();

const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;

export const registerWebHook = (webHookInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/register";
    restTemplate.post(url, webHookInfo, onResponse);
}

export const updateWebHook = (webHookInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/update";
    restTemplate.post(url, webHookInfo, onResponse);
}

export const searchWebHook = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/search";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    restTemplate.post(url, searchCondition, onResponse);
}

export const searchWebHookAll = (onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/search/all";
    restTemplate.get(url, onResponse);
}

export const deleteWebHook = (id, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/delete/"+id;
    restTemplate.get(url, onResponse);
}

export const deleteWebHookByName = (name, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/delete/byName/"+name;
    restTemplate.get(url, onResponse);
}

export const checkWebHookUrl = (webHookUrl, sampleData, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/webhook/check-url";
    restTemplate.post(url, {
        url: webHookUrl,
        sampleData: sampleData
    }, onResponse);
}