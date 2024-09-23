import React, { Fragment } from 'react';

import {
    Box,
    Button,
    TextField,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Tooltip,
    Typography,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const ServiceBeanFlashTypeForm = (props) => {

    const [propsValueChanged, setPropsValueChanged] = React.useState(false);
    const [value, setValue] = React.useState({
        serviceBeanName: "",
        methodName: "",
        targetName: "",
        savingPeriod: 14,
        unit: "DAY",
        description: ""
    });

    React.useEffect(()=>{
        if(propsValueChanged) {
            setPropsValueChanged(false);
            return;
        } else {
            props.onChange(value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    React.useEffect(()=>{
        setPropsValueChanged(true);
        setValue(props.value);
    }, [props.value]);

    return (
        <Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '45ch' }}
                    id="service-bean-name-text-field-outlined"
                    required
                    label={
                        <Fragment>
                            { "Service Bean Name" }
                            <Tooltip title="Bean name for Java springframework">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ shrink: true }}
                    value={ value.serviceBeanName }
                    size="small"
                    // helperText="Bean name for Java springframework"
                    // FormHelperTextProps={{
                    //     sx: { color: 'green', display: "block" }
                    // }}
                    onChange={ (e)=>setValue({ ...value, serviceBeanName: e.target.value })}
                    disabled={ props.editMode === true ? false : true }
                />
                <TextField
                    sx={{ p:0, width: '35ch', height: "10px", ml: 1.5 }}
                    id="method-name-text-field-outlined"
                    label={
                        <Fragment>
                            { "Method Name" }
                            <Tooltip title="Method Name in your Service Bean">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ shrink: true }}
                    value={ value.methodName }
                    size="small"
                    required
                    onChange={ (e)=>setValue({ ...value, methodName: e.target.value })}
                    disabled={ props.editMode === true ? false : true }
                />
                <TextField
                    sx={{ p:0, width: '24ch', height: "10px", ml: 1.5 }}
                    id="target-name-text-field-outlined"
                    label={
                        <Fragment>
                            { "Target Name" }
                            <Tooltip title="Target Name used in your Method">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ shrink: true }}
                    value={ value.targetName }
                    size="small"
                    required
                    onChange={ (e)=>setValue({ ...value, targetName: e.target.value })}
                    disabled={ props.editMode === true ? false : true }
                />
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '20ch' }}
                    id="saving-period-number-text-field-outlined"
                    required
                    label="Saving"
                    InputLabelProps={{ shrink: true }}
                    value={ value.savingPeriod }
                    size="small"
                    onChange={ (e)=>setValue({ ...value, savingPeriod: e.target.value })}
                    disabled={ props.editMode === true ? false : true }
                />
                <FormControl>
                    <InputLabel required sx={{  ml: 1.5, p:0 }}>Unit</InputLabel>
                    <Select
                        labelId="saving-period-unit-select-label"
                        id="saving-period-unit-select"
                        InputLabelProps={{ shrink: true }}
                        value={ value.unit }
                        // value="DAY"
                        label="Saving Period Unit"
                        onChange={ (e)=>setValue({ ...value, unit: e.target.value })}
                        sx={{ width: '23.5ch', ml: 1.5 }}
                        size="small"
                        // disabled
                    >
                        <MenuItem value="YEAR">YEAR</MenuItem>
                        <MenuItem value="MONTH">MONTH</MenuItem>
                        <MenuItem value="WEEK">WEEK</MenuItem>
                        <MenuItem value="DAY">DAY</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    sx={{ p:0, width: '60.5ch', height: "10px", ml: 1.5 }}
                    id="description-text-field-outlined"
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                    value={ value.description }
                    size="small"
                    onChange={ (e)=>setValue({ ...value, description: e.target.value })}
                    disabled={ props.editMode === true ? false : true }
                />
            </Box>
        </Box>
    )
}

const AuditMsgMgmtRuleCreationUpdateView = (props) => {

    const [flashByType, setFalshByType] = React.useState("SERVICE_BEAN");
    const [value, setValue] = React.useState({
        cronExpression: "", 
        serviceBeanName: "",
        methodName: "",
        targetName: "",
        savingPeriod: 14,
        unit: "DAY",
        use: true,
        description: ""
    });

    const [editMode, setEditMode] = React.useState(false);
    const [id, setId] = React.useState(undefined);
    const [ruleName, setRuleName] = React.useState("audit-message-management-rule-executor");
    const [ruleClassName, setRuleClassName] = React.useState("com.mymes.equip.tc.schedule.jobs.DataTableFlashJob");
    const [triggerType, setTriggerType] = React.useState("CRON");

    React.useEffect(()=>{
        if(props.ruleExecutorInfo!==undefined) {
            const temp = {};
            setId(props.ruleExecutorInfo.id)
            setRuleName(props.ruleExecutorInfo.name);
            setRuleClassName(props.ruleExecutorInfo.jobClassName);
            setTriggerType(props.ruleExecutorInfo.triggerType)
            temp.cronExpression=props.ruleExecutorInfo.cronExpression
            temp.use=props.ruleExecutorInfo.use;
            temp.description=props.ruleExecutorInfo.description;
            temp.unit="DAY"
            props.ruleExecutorInfo.jobDetails && props.ruleExecutorInfo.jobDetails.forEach((detail, index)=>{
                if(detail.entryKey==="serviceBeanName") {
                    temp.serviceBeanName=detail.entryValue;
                } else if(detail.entryKey==="methodName") {
                    temp.methodName=detail.entryValue;
                } else if(detail.entryKey==="targetName") {
                    temp.targetName=detail.entryValue;
                } else if(detail.entryKey==="savingDays") {
                    temp.savingPeriod=detail.entryValue;
                }
            });
            setValue(temp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.ruleExecutorInfo]);

    const handleOnChange = (passedValue) => {
        setValue({
            ...value,
            serviceBeanName: passedValue.serviceBeanName,
            methodName: passedValue.methodName,
            targetName: passedValue.targetName,
            savingPeriod: passedValue.savingPeriod,
            unit: passedValue.unit,
            description: passedValue.description
        });
    }

    const handleOnSubmit = () => {
        var days = 0;
        if(value.unit==="DAY") {
            days = value.savingPeriod;
        } else if(value.unit==="WEEK") {
            days = value.savingPeriod * 7;
        } else if(value.unit==="MONTH") {
            days = value.savingPeriod * 30;
        } else if(value.unit==="YEAR") {
            days = value.savingPeriod * 365;
        } else {
            days = value.savingPeriod;
        }

        props.onSubmit({
            oper: props.creatable ? "Create" : props.updatable ? "Update" : "",
            id: id===undefined ? ruleName : id,
            name: ruleName,
            jobClassName: ruleClassName,
            schedulerName: "NO_ASSIGNED",
            groupName: "TEST",
            triggerType: triggerType,
            cronExpression: value.cronExpression,
            use: value.use === undefined ? false : value.use,
            startDelay: -1,
            repeatInterval: -1,
            description: value.description,
            jobDetails: [
                {
                    entryKey: "flashByType",
                    entryValue: flashByType,
                    entryValueType: "STRING",
                    description: "Job class's execution manner type"
                },
                {
                    entryKey: "serviceBeanName",
                    entryValue: value.serviceBeanName,
                    entryValueType: "STRING",
                    description: "Bean name for Java springframework"
                },
                {
                    entryKey: "methodName",
                    entryValue: value.methodName,
                    entryValueType: "STRING",
                    description: "Method name in your service name"
                },
                {
                    entryKey: "targetName",
                    entryValue: value.targetName,
                    entryValueType: "STRING",
                    description: "Target name used in your method"
                },
                {
                    entryKey: "savingDays",
                    entryValue: days,
                    entryValueType: "INT",
                    description: "Audit message saving days"
                }
            ]
        });
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='body'>Audit Message 관리룰 생성 (변경)</Typography>
                <FormControlLabel 
                    sx={{ m: 0, pt: 0 }} 
                    control={<Switch size="small" checked={ editMode } />} 
                    label="편집모드" 
                    onClick={ (e)=>setEditMode(e.target.checked) }
                    // disabled={ id===undefined ? true : false }
                />
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '45ch', height: "10px" }}
                    id="audit-msg-mgmt-rule-name-text-field-outlined"
                    label="Audit Message Mgmt Rule Name"
                    InputLabelProps={{ shrink: true }}
                    value={ ruleName }
                    size="small"
                    disabled
                />
                <TextField
                    sx={{ p:0, width: '60ch', ml: 1.5 }}
                    id="group-name-text-field-outlined"
                    label="Java Class Name"
                    InputLabelProps={{ shrink: true }}
                    value={ ruleClassName }
                    size="small"
                    disabled
                />
            </Box>
            <Box sx={{ mt: 2 }}>
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0 }}>Data Flash Type</InputLabel>
                    <Select
                        labelId="audit-msg-mgmt-rule-type-select-label"
                        id="audit-msg-mgmt-rule-type-select"
                        InputLabelProps={{ shrink: true }}
                        value={ flashByType }
                        label="Data Flash Type"
                        onChange={ (e)=>setFalshByType(e.target.value) }
                        sx={{ width: '45ch'}}
                        size="small"
                    >
                        <MenuItem value="NATIVE_QUERY">Native Query</MenuItem>
                        <MenuItem value="SERVICE_BEAN">Service Bean</MenuItem>
                        <MenuItem value="SIMPLE">Simple (Table and Saving days)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: flashByType==="NATIVE_QUERY" ? "block" : "none" }}>
                    <div>TO-BE developed</div>
                </Box>
                <Box sx={{ display: flashByType==="SERVICE_BEAN" ? "block" : "none" }}>
                    { /* ============================================================ */}
                    <ServiceBeanFlashTypeForm 
                        onChange={ handleOnChange }
                        editMode={ editMode }
                        value={ value }
                    />
                    { /* ============================================================ */}
                </Box>
                <Box sx={{ display:  flashByType==="SIMPLE" ? "block" : "none" }}>
                    <div>TO-BE developed</div>
                </Box>
            </Box>
            <Box sx={{ mt: 2, display: "flex" }}>
                <TextField
                    sx={{ p:0, width: '45ch' }}
                    id="cron-expression-text-field-outlined"
                    required
                    label={
                        <Fragment>
                            { "Cron Expression" }
                            <Tooltip title="Rule should be executed by cron">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ shrink: true }}
                    value={ value.cronExpression }
                    size="small"
                    onChange={ (e)=>setValue({ ...value, cronExpression: e.target.value })}
                    disabled={ editMode === true ? false : true }
                />
                <FormControlLabel 
                    sx={{ m: 0, pt: 0, ml: 1.5 }} 
                    control={<Switch size="small" checked={ value.use ? value.use : false } />} 
                    label="Publish" 
                    onClick={ (e)=>setValue({ ...value, use: e.target.checked }) }
                    disabled={ !editMode }
                />
                <Button
                    sx={{ ml: 2 }}
                    variant='contained'
                    color='primary'
                    onClick={ handleOnSubmit }
                    disabled={ !editMode }
                >
                    Rule { props.updatable === true ? "수정" : "생성" } 하기
                </Button>
            </Box>
        </Box>
    )
}

export default AuditMsgMgmtRuleCreationUpdateView;