import React from 'react';

import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const SimpleSearchBar = ( props ) => {

    const [searchInput, setSearchInput] = React.useState("");

    const handleSearch = () => {
        props.onSearchButtonClicked(searchInput);
    }

    return (
        <Stack sx={{ width: "100%" }} { ...props }>
            {props.title !==undefined && props.title!=="" &&
            <Box>
                <Typography variant='h7'>{ props.title }</Typography>
            </Box>
            }
            
            <Box sx={{ mt: (props.title===undefined || props.title==="") ? 0 : 2, display: "flex", alignItems: "center" }}>
                <TextField
                    // sx={{ p:0, width: props.width, "& .MuiInputBase-root": { height: 45 } }}
                    sx={{ p:0, m: 0, width: props.width, fontSize: 14 }}
                    required
                    value={ searchInput }
                    id="search-input-text-required"
                    label="Type search keyword"
                    InputLabelProps={{ sx:{ fontSize: 14 }, shrink: true }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={e=>setSearchInput("")} 
                                    sx={{ 
                                        visibility: searchInput ? "visible" : "hidden"
                                    }}
                                >
                                    <ClearIcon fontSize='small'/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { fontSize: 14 }
                    }}
                    onChange={e=>setSearchInput(e.target.value)}
                    size='small'
                />
                <Button 
                    sx={{ ml: 1 }} 
                    variant="contained" 
                    color='inherit'
                    startIcon={<SearchIcon color='inherit'/>}
                    onClick={ handleSearch }
                >
                    <Typography sx={{ fontSize: 14 }}>{ props.label }</Typography>
                </Button>
            </Box>
        </Stack>    
    )
}

export default SimpleSearchBar;