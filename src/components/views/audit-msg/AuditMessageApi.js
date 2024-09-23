import { createRestTemplate } from '../../../utils/RestTemplate';

const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;

const restTemplate=createRestTemplate();

export const searchAuditMessage = async (searchCondition) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/audit/search/range";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    var response = [];
    response=await restTemplate.postAsSync(url, searchCondition);
    return response.data;
}

export const findAuditMessageRuleExecutor = () => {
    return undefined;
}

export const deleteAuditsByTimestamp = (timestamp, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/ifsvc/audit/delete/timestamp";
    restTemplate.post(url, timestamp, onResponse);
}