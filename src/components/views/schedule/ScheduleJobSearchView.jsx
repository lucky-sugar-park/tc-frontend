import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import SimpleSearchBar from '../../widgets/bars/SimpleSearchBar';

import { searchScheduleJobs } from './ScheduleApi';

const ScheduleJobSearchView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [searchBy, setSearchBy] = React.useState("id");
    const [searchInput, setSearchInput] = React.useState(undefined);

    React.useEffect(()=>{
        if(props.reloadScheduleJobList===true) {
            handleSearch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reloadScheduleJobList]);

    const handleOnScheduleJobSearch = (input) => {
        handleSearch(input);
        setSearchInput(input)
    }

    const handleSearch = (input) => {
        const searchCondition = {
            conditions: [],
            pageInfo: {
                page: 0,
                size: 1000,
                sortDirection: "ASCENDING",
                sortBy: ["id", 'name']
            }
        }
        var keyword = searchInput;
        if(input!==undefined || ""!==input) {
            keyword=input;
        }

        if(keyword!=="" && keyword!==undefined) {
            searchCondition.conditions.push({
                name: searchBy,
                condType: "CONTAINS",
                conjType: "NONE",
                value: keyword
            });
        }
        searchScheduleJobs(searchCondition, (scheduleJobs, error)=>{
            if(error===undefined) {
                props.onScheduleJobListChange(scheduleJobs);
            } else {
                Notifier.warn({ title: "", message: "", modal: true })
            }
        });
    }

    return (
        <Box>
            <Typography variant='h7'>Schedule Job 검색</Typography>
            <Box sx={{ mt: 3.5, display: "flex", alignItems: "center" }}>
                {
                !props.hideSearchBy && 
                <Box sx={{ mr: 1.5 }}>
                    {/* <FormControl sx={{ "& .MuiInputBase-root": { height: 45 } }}> */}
                    <FormControl>
                        <InputLabel sx={{  m: 0, p:0, fontSize: 14, mt: 0.3 }}>Search By</InputLabel>
                        <Select
                            labelId="schedule-job-search-by-type-select-label"
                            id="schedule-job-search-by-type-select"
                            InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                            value={ searchBy }
                            label="Search By"
                            onChange={ e=>setSearchBy(e.target.value) }
                            sx={{ width: '18ch', fontSize: 14 }}
                            size='small'
                        >
                            <MenuItem value="id" sx={{ fontSize: 14 }}>ID</MenuItem>
                            <MenuItem value="name" sx={{ fontSize: 14 }}>Name</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                }
                
                <Box sx={{ ml: 0 }}>
                    <SimpleSearchBar 
                        // title="Schedule Job 검색"
                        onSearchButtonClicked={ handleOnScheduleJobSearch }
                        width="43ch"
                        label="Search"
                        fontSize="14px"
                        { ...props }
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ScheduleJobSearchView;