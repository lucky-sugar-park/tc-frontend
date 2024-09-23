import React from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
    Autocomplete,
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { useTheme } from '@mui/material/styles';

import ClearIcon from '@mui/icons-material/Clear';

import MultiConditionalSearchBar from '../../widgets/bars/MultiConditionalSearchBar';

import { searchPlcConnectorAll } from '../plc-connector/PlcConnectorApi';
import { searchInterface } from './InterfsApi';

dayjs.extend(utc);

const InterfsSearchView = (props) => {

    const theme = useTheme();

    const [plcList, setPlcList] = React.useState([]);
    const [values, setValues] = React.useState({
        name: "",
        plcName: [],
        replyName: "",
        interfaceType: [],
        registeredDate: [ dayjs.utc('2024-01-11'), dayjs.utc('2024-12-31') ]
    });

    const [condItems, setCondItems] = React.useState([]);

    React.useEffect(()=>{
        const temp = [];
        searchPlcConnectorAll((plcs, error)=>{
            if(error===undefined) {
                plcs.forEach((plc, index)=>{
                    temp.push(plc.name)
                })
                setPlcList(temp);
            }
        });
    }, []);

    React.useEffect(()=>{
        if(props.reloadInterfaceList===true) {
            handleSearch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reloadInterfaceList]);

    const handleSearch = () => {
        const searchCondition = {
            conditions: [],
            pageInfo: {
                page: 0,
                size: 10,
                sortDirection: "ASCENDING",
                sortBy: [ "id", "name" ]
            }
        };

        condItems.forEach(item=>{
            searchCondition.conditions.push({
                name: item.name,
                condType: item.cond,
                conjType: item.conj,
                value: item.value
            });
        });

        searchInterface(searchCondition, (ifList, error)=>{
            if(error===undefined) {
                props.onInterfaceListChange(ifList);
            } else {
                props.onInterfaceListChange([]);
            }
        });
    }

    const handleCondItemAddition = (item) => {
        var v=undefined;
        switch(item.name) {
            case "name":
                v=values.name;
                break;
            case "plcName":
                if(item.cond!=="IN" && item.cond!=="NOT_IN") v=values.plcName[0];
                else v=values.plcName;
                break;
            case "replyName":
                v=values.replyName;
                break;
            case "interfaceType":
                if(item.cond!=="IN" && item.cond!=="NOT_IN") v=values.interfaceType[0];
                else v=values.interfaceType;
                break;
            case "createdDate":
                v=values.registeredDate;
                break;
            default:
                break;
        }
        setCondItems([ 
            ...condItems,
            {
                seq:  item.seq,
                name: item.name,
                cond: item.cond,
                conj: item.conj,
                value: v
            }
        ])
    }

    const handleCondItemDeletion = (seq) => {
        var temp=[];
        var nseq=0;
        for(var i=0; i<condItems.length; i++) {
            if(i===seq) continue;
            condItems[i].seq=nseq++;
            temp.push(condItems[i]);
        }
        // var temp=condItems.filter((item,idx)=>idx!==index);
        if(temp.length>0) temp[0].conj="NONE";
        setCondItems(temp);
    }

    const handleCondItemClick = (index) => {
        if(index===0) {
            condItems[index].conj="NONE";
        }
        setCondItems(condItems);
    }

    const handlePlcNameSelectionChange = (event, selectedOptions, reason) => {
        const plcNames=[];
        selectedOptions.forEach(option=>{
            plcNames.push(option.name);
        });

        setValues({
            ...values,
            plcName: plcNames
        })
    }

    const handleInterfaceTypeChange = (checked, type) => {
        var temp=values.interfaceType;
        if(checked) temp.push(type);
        else temp=temp.filter((value, index)=>value!==type);
        setValues({
            ...values,
            interfaceType: temp
        })
    }

    return (
        <Box>
            <Typography variant='h7'>인터페이스 검색</Typography>
            <MultiConditionalSearchBar
                // title="인터페이스 검색"
                searchLabel="Search"
                searchCondItems={ condItems }
                onSearchButtonClicked={ handleSearch }
                onCondItemDel={ handleCondItemDeletion }
                onCondItemAdd={ handleCondItemAddition }
                onCondItemClick={ handleCondItemClick }
                searchByItems={[
                    {
                        label: "PLC 이름",
                        value: "plcName",
                        element: 
                            <Autocomplete
                                clearOnEscape={ true }
                                multiple
                                id="interface-search-plc-name-autocomplete"
                                options={ plcList }
                                getOptionLabel={ (plcName) => plcName }
                                filterSelectedOptions
                                onChange={ handlePlcNameSelectionChange }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select PLC"
                                        placeholder="To search"
                                        sx={{ minWidth: "400px" }}
                                    />
                                )}
                                sx={{ minWidth: "400px" }}
                                size='small'
                            />
                    },
                    {
                        label: "인터페이스 유형",
                        value: "interfaceType",
                        element: 
                            <Box sx={{ minWidth: "400px" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="READ" size='small'/>
                                    }
                                    label="READ"
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                                    onChange={ e=>handleInterfaceTypeChange(e.target.checked, "READ") }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox name="WRITE" size='small'/>
                                    }
                                    label="WRITE"
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                                    onChange={ e=>handleInterfaceTypeChange(e.target.checked, "WRITE") }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox name="REPLY" size='small'/>
                                    }
                                    label="REPLY"
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                                    onChange={ e=>handleInterfaceTypeChange(e.target.checked, "REPLY") }
                                />
                            </Box>
                    },
                    {
                        label: "인터페이스 등록일자",
                        value: "createdDate",
                        element: 
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                                <DateRangePicker
                                    value={ values.registeredDate }
                                    onChange={(newValue) => setValues({ ...values, registeredDate: newValue })}
                                    calendars={ 2 }
                                    localeText={{ start: 'From', end: 'To' }}
                                    sx={{ 
                                        minWidth: "400px",
                                        '& .MuiInputLabel-root': { mt: 0.3, fontSize: "14px", color: theme.palette.text.secondary },                                        
                                    }}
                                    slots={{ field: SingleInputDateRangeField }}
                                    slotProps={{ textField: { size: 'small', error: false }} }
                                    label="Registration Date Range"
                                    format="YYYY-MM-DD"
                                    disableFuture
                                />
                            </LocalizationProvider>
                    },
                    {
                        label: "인터페이스 이름",
                        value: "name",
                        element: 
                            <TextField
                                sx={{ p:0, minWidth: "400px" }}
                                value={ values.name }
                                id="search-input-text-required"
                                label="Type search keyword"
                                InputLabelProps={{ shrink: true, fontSize: "14px" }}
                                onChange={ e=>setValues({ ...values, name: e.target.value })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={()=>setValues({ ...values, name: "" })} 
                                                sx={{ 
                                                    visibility: values.name ? "visible" : "hidden"
                                                }}
                                            >
                                                <ClearIcon fontSize='small'/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { fontSize: 14 }
                                }}
                                size='small'
                            />
                    },
                    {
                        label: "응답 인터페이스 이름",
                        value: "replyName",
                        element: 
                            <TextField
                                sx={{ p:0, minWidth: "400px" }}
                                value={ values.replyName }
                                id="search-input-text-required"
                                label="Type search keyword"
                                InputLabelProps={{ shrink: true }}
                                onChange={ e=>setValues({ ...values, replyName: e.target.value })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                onClick={()=>setValues({ ...values, replyName: "" })}
                                                sx={{ 
                                                    visibility: values.replyName ? "visible" : "hidden"
                                                }}
                                            >
                                                <ClearIcon fontSize='small'/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { fontSize: "14px" }
                                }}
                                size='small'
                            />
                    },
                ]}
            />
        </Box>
    )
}

export default InterfsSearchView;