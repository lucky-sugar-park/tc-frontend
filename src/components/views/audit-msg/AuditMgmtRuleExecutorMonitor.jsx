import React from 'react';

import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Tooltip,
} from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PauseIcon from '@mui/icons-material/Pause';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import StartIcon from '@mui/icons-material/Start'

import { rescheduleJob, unscheduleJob, updateScheduldJob, pauseScheduleJob, resumeScheduleJob } from '../schedule/ScheduleApi';
import AuditMgmtRuleExecutorInfoDialog from './AuditMgmtRuleExecutorInfoDialog';

const AuditMgmtRuleExecutorMonitor = (props) => {

    const [detailInfoOpen, setDetailInfoOpen] = React.useState(false);

    const [ruleExecInfo, setRuleExecInfo] = React.useState(undefined);

    React.useEffect(()=>{
        if(props.ruleExecInfo) {
            setRuleExecInfo(props.ruleExecInfo);
        }
    }, [props.ruleExecInfo])

    const handleRescheduling = () => {
        rescheduleJob(ruleExecInfo.name, (reply)=>{
            setRuleExecInfo(reply);
        });
    }

    const handleUnscheduling = () => {
        unscheduleJob(ruleExecInfo.name, (reply)=>{
            setRuleExecInfo(reply);
        });
    }

    const handlePause = () => {
        pauseScheduleJob(ruleExecInfo.name, (reply)=>{
            setRuleExecInfo(reply);
        });
    }

    const HandleResume = () => {
        resumeScheduleJob(ruleExecInfo.name, (reply)=>{
            setRuleExecInfo(reply);
        });
    }

    const handleDetailInfoClose = () => {
        setDetailInfoOpen(false);
    }

    const handleOnUpdateSubmit = (ruleExecInfo) => {
        console.log("@@@@=>" + JSON.stringify(ruleExecInfo))
        setDetailInfoOpen(false);
        updateScheduldJob(ruleExecInfo, (reply, error)=>{
            setRuleExecInfo(reply);
        });
    }

    return (
        <div>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        sx={{ p:0, width: '47ch' }}
                        id="audit-msg-mgmt-rule-name-text-field-outlined"
                        label="Audit Message Mgmt Rule Name"
                        InputLabelProps={{ shrink: true }}
                        value={ ruleExecInfo ? ruleExecInfo.name:""}
                        // size="small"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title={ ruleExecInfo&&ruleExecInfo.triggerState }>
                                    {
                                        ruleExecInfo && (ruleExecInfo.triggerState==="NORMAL" || ruleExecInfo.triggerState==="GOOD") 
                                        ?
                                        <SentimentSatisfiedAltIcon sx={{ fontSize: "42px" }} color='success'/>
                                        : ruleExecInfo && (ruleExecInfo.triggerState==="ERROR") ?
                                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: "42px" }} color='error' />
                                        :
                                        <SentimentNeutralIcon sx={{ fontSize: "42px" }} color='action'/>    
                                    }
                                </Tooltip>
                              </InputAdornment>
                            ),
                        }}
                        disabled
                    />
                    <TextField
                        sx={{ p:0, ml: 1.5, width: '25ch' }}
                        id="audit-msg-mgmt-rule-name-text-field-outlined"
                        label="Execution Trigger Type"
                        InputLabelProps={{ shrink: true }}
                        value={ ruleExecInfo ? ruleExecInfo.triggerType+" : " + ruleExecInfo.cronExpression : "" }
                        // size="small"
                        disabled
                    />
                    <Button variant='contained' sx={{ ml: 1.5 }} onClick={ ()=>setDetailInfoOpen(true) }>
                        상세정보
                    </Button>
                    <Button variant='contained' sx={{ ml: 1.5 }}>
                        실행이력
                    </Button>
                </Box>
                <Box sx={{ display: "flex", mt: 1.5, alignItems: "center" }}>
                    {
                        ruleExecInfo && ruleExecInfo.triggerState==="NONE" ?
                        <Button startIcon={ <ScheduleIcon />} sx={{ justifyItems: "center" }} onClick={ handleRescheduling }>
                            작업예약
                        </Button>
                        :
                        <Button sx={{ ml: 1.5 }} startIcon={ <HistoryToggleOffIcon />} onClick={ handleUnscheduling }>
                            작업취소
                        </Button>
                    }
                    {
                        ruleExecInfo && ruleExecInfo.triggerState!=="NONE" ? ruleExecInfo && ruleExecInfo.triggerState==="PAUSED" ?
                        <Button sx={{ ml: 1.5 }} startIcon={ <StartIcon />} onClick={ HandleResume }>
                            다시시작
                        </Button>
                        :
                        <Button sx={{ ml: 1.5 }} startIcon={ <PauseIcon />} onClick={ handlePause }>
                            일시멈춤
                        </Button>
                        :
                        ""
                    }
                </Box>
            </Box>
            <AuditMgmtRuleExecutorInfoDialog 
                open={ detailInfoOpen }
                onClose={ handleDetailInfoClose }
                ruleExecutorInfo={ ruleExecInfo }
                creatable={ false }
                updatable= { true }
                onSubmit={ handleOnUpdateSubmit }
            />
        </div>
    )
}

export default AuditMgmtRuleExecutorMonitor;