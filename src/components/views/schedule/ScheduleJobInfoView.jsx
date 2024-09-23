import React from 'react';

import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';

// import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
// import ScheduleJobDetailsList from './ScheduleJobDetailListTableView';

const ScheduleJobInfoView = (props) => {

    // const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(props.editMode);
    const [scheduleJob, setScheduleJob] = React.useState(props.scheduleJob);
    const [value, setValue] = React.useState(props.scheduleJob);

    const [applied, setApplied] = React.useState(false);

    React.useEffect(()=>{
        setScheduleJob(props.scheduleJob);
        setValue(props.scheduleJob);
    }, [props.scheduleJob]);

    // const handleDetailsClose = () => {
    //     setDetailsOpen(false);
    // }

    // const handleDetailsOK = () => {
    //     setDetailsOpen(false);
    // }

    const handleOnUseClick = (e) => {
        setValue({
            ...value,
            use: e.target.checked
        });
        setApplied(false);
    }

    const handleTriggerTypeChange = (e) => {
        setValue({ 
            ...value, 
            triggerType: e.target.value 
        });
        setApplied(false);
    }

    const handleOnReset = () => {
        setValue(scheduleJob);
    }

    const handleOnChange = (propName, val) => {
        setValue({
            ...value,
            [propName]: val
        });
        setApplied(false);
    }

    const handleOnChangeApply = () =>{
        if(props.onUpdateApply !== undefined) {
            props.onUpdateApply(value);
        } else {
            setValue(value);
        }
        setApplied(true);
    }

    return (
        <>
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ mb: 1, p:0 }}>
                    <Typography variant='h7'>Schedule Job</Typography>
                </Box>
                <Box sx={{ display: "flex", float: "right", mb:1, p:0 }}>                    
                    <Button 
                        startIcon={ <CheckIcon /> }
                        onClick={ handleOnChangeApply }
                        sx={{ ml: 1 }}
                        size='small'
                        color='inherit'
                        disabled={ !editMode || applied }
                    >
                        임시저장
                    </Button>
                    <Button 
                        startIcon={ <RefreshIcon color='inherit'/> }
                        sx={{ ml: 1 }}
                        size='small'
                        color="inherit"
                        onClick={ handleOnReset }
                        disabled={ !editMode }
                    >
                        리셋
                    </Button>
                    <FormControlLabel 
                        sx={{ m: 0, pt: 0 }} 
                        control={<Switch size='small' checked={ editMode } />} 
                        label={ <Typography fontSize={ 14 }>Edit</Typography> }
                        componentsProps={{  }}
                        onClick={e=>setEditMode(e.target.checked)}
                    />
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <TextField
                    required
                    sx={{ width: '65ch' }}
                    id="scheduler-job-id-text-field-outlined"
                    label="Schedule Job ID"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.id : "" }
                    disabled={ !editMode }
                    onChange={ e=>handleOnChange("id", e.target.value) }
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                <TextField
                    required
                    sx={{ width: '65ch' }}
                    id="schedule-job-name-text-field-outlined"
                    label="Schedule Job Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.name : "" }
                    disabled={ !editMode }
                    onChange={ e=>handleOnChange("name", e.target.value )}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <TextField
                    sx={{ width: '32ch' }}
                    id="scheduleer-name-text-field-outlined"
                    label="Scheduler Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.schedulerName : "" }
                    disabled
                    size='small'
                />
                <TextField
                    sx={{ width: '32ch' }}
                    id="group-name-text-field-outlined"
                    label="Group Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.groupName : "" }
                    disabled
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <TextField
                    sx={{ width: '65ch' }}
                    id="scheduleer-job-class-name-text-field-outlined"
                    label="Schedule Job Class Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.jobClassName : "" }
                    disabled={ !editMode }
                    onChange={ e=>setValue({ ...value, jobClassName: e.target.value })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <TextField
                    sx={{ width: '36ch' }}
                    id="group-name-text-field-outlined"
                    label="Trigger Status : Changed Time"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? (value.triggerState + " : " + value.stateChangedTime) : "" }
                    size='small'
                    disabled
                />
                <FormControlLabel 
                    control={<Switch size="small" checked={ value ? value.use : false } />} 
                    label={ <Typography sx={{ fontSize: 14 }}>사용</Typography>} 
                    onClick={ handleOnUseClick }
                    disabled={ !editMode }
                />
                <FormControl>
                    <InputLabel sx={{ fontSize: 14 }}>Trigger Type</InputLabel>
                    <Select
                        labelId="schedule-job-trigger-type-select-label"
                        id="schedule-job-trigger-type-select"
                        InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                        value={ value && value.triggerType ? value.triggerType : "CRON" }
                        label="Trigger Type"
                        onChange={ handleTriggerTypeChange }
                        disabled={ !editMode }
                        sx={{ width: '17ch', fontSize: 14 }}
                        size='small'
                    >
                        <MenuItem value="SIMPLE" sx={{ fontSize: 14 }}>SIMPLE</MenuItem>
                        <MenuItem value="CRON"  sx={{ fontSize: 14 }}>CRON</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                <TextField
                    sx={{ width: '33ch' }}
                    id="cron-expression-text-field-outlined"
                    label="Cron Expression"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.cronExpression : "CRON"  }
                    disabled={ ((value && value.triggerType==="CRON") && editMode) ? false : true }
                    onChange={ e=>setValue({ ...value, cronExpression: e.target.value })}
                    size='small'
                />
                <TextField
                    sx={{ width: '15ch' }}
                    id="start-delay-text-field-outlined"
                    label="Start Delay"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.startDelay : "" }
                    disabled={ ((value && value.triggerType==="CRON") || !editMode) ? true : false }
                    onChange={ e=>setValue({ ...value, startDelay: e.target.value })}
                    size='small'
                />
                <TextField
                    sx={{ width: '15ch',  }}
                    id="repeat-interval-text-field-outlined"
                    label="Repeat Interval"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.repeatInterval : "" }
                    disabled={ ((value && value.triggerType==="CRON") || !editMode) ? true : false }
                    onChange={ e=>setValue({ ...value, repeatInterval: e.target.value })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                <TextField
                    id="schedule-job-description-text-field-outlined"
                    rows={5}
                    multiline
                    sx={{
                        p:0, width: '65ch',
                        "& .MuiInputBase-input": {
                             overflow: "hidden",
                             textOverflow: "ellipsis"
                        }
                    }}
                    label="Description"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    value={ value ? value.description : "" }
                    disabled={ !editMode }
                    onChange={ e=>setValue({ ...value, description: e.target.value })}
                    size='small'
                />
            </Box>
        </Box>
        {/* <ConfirmationModalDialog
            open={ detailsOpen }
            onClose={ handleDetailsClose }
            onCancel={ handleDetailsClose }
            onConfirm={ handleDetailsOK }
            title="Schedule Job Details Dialog"
            confirmation={ true }
            setOpen={ handleDetailsClose }
            titleDivider
            actionDivider
        >
            <ScheduleJobDetailsList 
                scheduleJobDetails={ scheduleJob ? scheduleJob.jobDetails : [] }
                editMode={ editMode }
            />
        </ConfirmationModalDialog> */}
        </>
    )
}

export default ScheduleJobInfoView;