import { createRestTemplate } from '../../../utils/RestTemplate';

const BASE_URL_SERVER_TC = process.env.REACT_APP_URL_SERVER_TC;

const restTemplate=createRestTemplate();

export const searchScheduleJobs = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/search";
    if(searchCondition.conditions===undefined) {
        searchCondition.conditions=[];
    }
    restTemplate.post(url, searchCondition, onResponse);
}

export const deleteScheduleJob = (jobId, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/delete/"+jobId;
    restTemplate.get(url, onResponse);
}

export const deleteScheduleJobByName = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/delete/byName/"+jobName;
    restTemplate.get(url, onResponse);
}

export const rescheduleJob = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/rescheduleJob/"+jobName;
    restTemplate.get(url, onResponse);
}

export const unscheduleJob = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/unscheduleJob/"+jobName;
    restTemplate.get(url, onResponse);
}

export const pauseScheduleJob = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/pauseScheduleJob/"+jobName;
    restTemplate.get(url, onResponse);
}

export const resumeScheduleJob = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/resumeScheduleJob/"+jobName;
    restTemplate.get(url, onResponse);
}

export const searchScheduleJobExecHistories = (searchCondition, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/search/job-exec-histories";
    restTemplate.post(url, searchCondition, onResponse);
}

export const findScheduleJobByname = (jobName, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/find/byName/"+jobName;
    restTemplate.get(url, onResponse);
}

export const registerScheduleJob = (jobInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/register";
    restTemplate.post(url, jobInfo, onResponse);
}

export const updateScheduldJob = (jobInfo, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/update";
    restTemplate.post(url, jobInfo, onResponse);
}

export const deleteScheduleJobsByBatch = (jobIds, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/management/delete/byBatch";
    restTemplate.post(url, jobIds, onResponse);
}

export const rescheduleJobsByBatch = (jobNames, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/rescheduleJob/byBatch";
    restTemplate.post(url, jobNames, onResponse);
}

export const unscheduleJobsByBatch = (jobNames, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/unscheduleJob/byBatch";
    restTemplate.post(url, jobNames, onResponse);
}

export const pauseScheduleJobsByBatch = (jobNames, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/pauseScheduleJob/byBatch";
    restTemplate.post(url, jobNames, onResponse);
}

export const resumeScheduleJobsByBatch = (jobNames, onResponse) => {
    var url=BASE_URL_SERVER_TC+"/api/v1/schedule-job/monitoring/resumeScheduleJob/byBatch";
    restTemplate.post(url, jobNames, onResponse);
}