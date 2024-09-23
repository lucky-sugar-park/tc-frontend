import React from 'react';

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';

import SimpleSearchBar from './SimpleSearchBar';

const SelectableSearchBySearchBar = (props) => {

    const {
        defaultSearchBy,
        hideSearchBy,
        onSearch,
        sortBy,
        searchByMenuItems,
        title
     } = props;

    const [searchBy, setSearchBy] = React.useState(defaultSearchBy===undefined?"-":defaultSearchBy);
    const [searchInput, setSearchInput] = React.useState("");

    React.useEffect(()=>{
        if(props.reloadSearch===true) {
            handleOnSearch(searchInput);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.reloadSearch]);

    const handleOnSearch = (input) => {
        setSearchInput(input);

        const searchCondition = {
            conditions: [],
            pageInfo: {
                page: 0,
                size: 1000,
                sortDirection: "ASCENDING",
                sortBy: sortBy
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
        onSearch(searchCondition);
    }

    return (
        <Box>
            <Typography variant='h7'>{ title }</Typography>
            <Box sx={{ mt: 3.5, display: "flex", alignItems: "center" }}>
            {hideSearchBy!==undefined&&hideSearchBy===false&&
                <Box sx={{ mr: 1.5 }}>
                    <FormControl>
                        <InputLabel sx={{  m: 0, p:0, fontSize: 14 }} required>Search By</InputLabel>
                        <Select
                            labelId="search-by-type-select-label"
                            id="search-by-type-select"
                            InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                            value={ searchBy }
                            label="Search By"
                            onChange={ e=>setSearchBy(e.target.value) }
                            sx={{ width: '20ch', fontSize: 14 }}
                            size='small'
                            required
                        >
                            {searchByMenuItems&&searchByMenuItems.map((item,index)=>{
                                return(
                            <MenuItem key={ item.key } value={ item.value } sx={{ fontSize: 14 }}>{ item.text }</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            }
                <Box sx={{ ml: 0 }}>
                    <SimpleSearchBar 
                        { ...props }
                        onSearchButtonClicked={ handleOnSearch }
                        width="43ch"
                        label="Search"
                        fontSize="14px"
                        title=""
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default SelectableSearchBySearchBar;