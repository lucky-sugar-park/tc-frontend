import React from 'react';

import {
    Box,
    Button,
    CircularProgress,
    Typography
} from '@mui/material';

import { findScheduleJobByname, registerScheduleJob, updateScheduldJob } from '../schedule/ScheduleApi';
import AuditMsgMgmtRuleCreationUpdateView from './AuditMsgMgmtRuleCreationUpdateView';
import AuditMgmtRuleExecutorMonitor from './AuditMgmtRuleExecutorMonitor';

const CheckCreation = (props) => {
    return (
        <Box sx={{ display: props.open ? "flex" : "none", mt: 2, alignItems: "center" }}>
            <Typography variant='body'>Checking Audit Message Management Rule Executor Creation...</Typography>
            <CircularProgress disableShrink size={ 30 } sx={{ ml: 1.5 }} />
        </Box>
    )
}

const CreationSuggestion = (props) => {

    const [showShrink, setShowShrink] = React.useState(false);
    const [creating, setCreating] = React.useState(false);

    React.useEffect(()=>{
        setCreating(props.creating);
    }, [props.creating])

    const handleOnClickOK = () => {
        props.onClickOK();
        setShowShrink(true);
    };

    const handleOnCancel = () => {
        setShowShrink(true);
        props.onClickCancel();
    }

    return (
        <Box sx={{ display: props.created ? "none" : "block", mt: 0 }}>
            <Box sx={{ display: showShrink ? "none" : "flex" }}>
                <Typography variant='body' fontSize={ 15 }>
                    Audit Message Management Rule Executor가 생성되지 않았습니다.
                    <br/>
                    생성하시겠습니까? 
                    <Button onClick={ handleOnClickOK }>
                        생성하기
                    </Button>&nbsp;
                    <Button onClick={ handleOnCancel }>
                        다음에
                    </Button>
                </Typography>
            </Box>
            <Box sx={{ display: showShrink ? "flex" : "none" }}>
                <Typography variant='body' fontSize={ 13 }>
                    Audit Message Management Rule Executor
                    {
                        !creating &&
                    <Button onClick={ handleOnClickOK }>
                        생성하기
                    </Button>
                    }
                    {
                        creating &&
                    <Button onClick={ handleOnCancel }>
                        다음에
                    </Button>
                    }
                </Typography>
            </Box>
        </Box>
    );
}

const InterfsAuditMsgMgmtRuleView = (props) => {

    const [created, setCreated] = React.useState(false);
    const [checking, setChecking] = React.useState(true);
    const [openCreateSuggestion, setOpenCreateSuggesion] = React.useState(false);
    const [openMonitor, setOpenMonitor] = React.useState(false);
    const [openCreation, setOpenCreation] = React.useState(false);
    const [auditMsgMgmtRuleExecInfo, setAuditMsgMgmtRuleExecInfo] = React.useState(undefined);

    React.useEffect(()=>{
        fetchRuleExecInfo();
    }, []);

    const fetchRuleExecInfo = () => {
        findScheduleJobByname("audit-message-management-rule-executor", (auditMsgMgmtRuleExecutor, error)=>{
            if(error===undefined) {
                if(auditMsgMgmtRuleExecutor.id===undefined) {
                    setOpenCreateSuggesion(true);
                } else {
                    setAuditMsgMgmtRuleExecInfo(auditMsgMgmtRuleExecutor);
                    setOpenMonitor(true);
                    setCreated(true);
                }
            } else {
                console.log("Error fetching audit message management rule executor.");
            }
            setChecking(false);
        });
    }

    const handleCreationOK = () => {
        setOpenCreateSuggesion(false);
        setOpenCreation(true);
    }

    const handleCreationCancel = () => {
        setOpenCreateSuggesion(true);
        setOpenCreation(false);
    }

    const handleOnCreationUpdateSubmit = (ruleExecInfo) => {
        if(ruleExecInfo.oper==="Create") {
            registerScheduleJob(ruleExecInfo, (resp, error)=>{
                fetchRuleExecInfo();
            });
        } else if(ruleExecInfo.oper==="Update") {
            updateScheduldJob(ruleExecInfo, (resp, error)=>{
                fetchRuleExecInfo();
            });
        }
    }

    return (
        <Box>
            <Box>
                <Box>
                    <CheckCreation open={ checking }/>
                    <CreationSuggestion 
                        open={ openCreateSuggestion } 
                        creating={ openCreation } 
                        created={ created } 
                        onClickOK={ handleCreationOK }
                        onClickCancel={ handleCreationCancel }
                    />
                </Box>
                <Box sx={{ mt: 1.5 }}>
                    <AuditMgmtRuleExecutorMonitor
                        open={ openMonitor } 
                        ruleExecInfo={ auditMsgMgmtRuleExecInfo }
                    />
                    {
                    openCreation && 
                    <AuditMsgMgmtRuleCreationUpdateView
                        ruleExecutorInfo={ auditMsgMgmtRuleExecInfo }
                        creatable={ true }
                        updatable={ false }
                        onSubmit={ handleOnCreationUpdateSubmit }
                    />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default InterfsAuditMsgMgmtRuleView;