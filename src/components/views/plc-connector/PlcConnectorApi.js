import { createRestTemplate } from '../../../utils/RestTemplate';

const restTemplate=createRestTemplate();

const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;

export const registerPlcConnector = (plcConInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/register";
    restTemplate.post(url, plcConInfo, onResponse);
}

export const updatePlcConnector = (plcConInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/update";
    restTemplate.post(url, plcConInfo, onResponse);
}

export const deletePlcConnector = (plcConId, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/delete/"+plcConId;
    restTemplate.get(url, onResponse);
}

export const publishPlcConnector = (plcConId, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/control/publish/"+plcConId;
    restTemplate.get(url, onResponse);
}

export const releasePlcConnector = (plcConId, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/control/release/"+plcConId;
    restTemplate.get(url, onResponse);
}

export const searchPlcConnector = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/search";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    restTemplate.post(url, searchCondition, onResponse);
}

export const searchPlcConnectorAsSync = async (searchCondition) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/search";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    var response = [];
    response=restTemplate.postAsSync(url, searchCondition);
    return response.data;
}

export const searchPlcConnectorAll = (onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/search/all";
    restTemplate.get(url, onResponse);
}

export const searchPlcConnectorAllAsSync = async () => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/search/all";

    var response = [];
    response=restTemplate.getAsSync(url);
    return response.data;
}

export const testPlcConnection = (plcConId, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/test-connection/"+plcConId;
    restTemplate.get(url, onResponse);
}

export const testPlcConnectionByIpAndPort = (ip, port, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/test-connection/byIpAddress/"+ip+"/"+port;
    restTemplate.get(url, onResponse);
}

export const searchPlcConnectionEventHistories = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/plc-connector/search/connection-history";
    restTemplate.post(url, searchCondition, onResponse);
}
