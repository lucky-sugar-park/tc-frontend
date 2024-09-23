import React from 'react';
import {
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';

const MultiConditionalSearchBar = (props) => {

    const [condType, setCondType] = React.useState("");
    const [conjType, setConjType] = React.useState("");
    const [conditionByIndex, setConditionByIndex]  = React.useState(0);
    const [searchByItems, setSearchByItems] = React.useState(props.searchByItems);
    const [condItemIndex, setCondItemIndex] = React.useState(0);
    const [condItems, setCondItems] = React.useState([]);

    React.useEffect(()=>{
        setSearchByItems(props.searchByItems);
    }, [props.searchByItems]);

    React.useEffect(()=>{
        setCondItems(props.searchCondItems);
    }, [props.searchCondItems]);

    const handleConjTypeChange = (conjType) => {
        if(condItems.length===0) setConjType("NONE");
        else {
            if(condItems.length>=0 && "NONE"===conjType) setConjType("AND");
            else setConjType(condType);
        }
    }

    const handleCondTypeChange = (e) => {
        setCondType(e.target.value)
    }

    const handleConditionByChange = (index) => {
        setConditionByIndex(index);
    }

    const handleSearch = () => {
        props.onSearchButtonClicked();
    }

    const handleApply = (index) => {
        const conj=condItems.length===0?"NONE":condItems.length>0&&"NONE"===conjType?"AND":conjType;
        props.onCondItemAdd({
            seq: condItems.length,
            conj: conj,
            cond: condType,
            name: searchByItems[index].value,
        });
    }

    const handleOnChipDelete = (index) => {
        props.onCondItemDel(index);
    }

    const handleOnChipClick = (chipSeq) => {
        setCondItemIndex(condItems[chipSeq].seq);
        setConjType(condItems[chipSeq].conj);
        setCondType(condItems[chipSeq].cond!==undefined?condItems[chipSeq].cond:"NONE");
        props.onCondItemClick(chipSeq);
    }

    return (
        <Stack>
            {
            props.title &&
            <>
            <Box sx={{ mt: 2 }}>
                <Typography variant='h7'>{ props.title }</Typography>
            </Box>
            <Divider sx={{ mt: 2 }}/>
            </>
            }
            <Box sx={{ display: "flex", mt: 2.5 }}>
                <FormControl>
                    <FormLabel id="multi-conj-search-bar-conj-type-radio-buttons-group-form-label">
                        <Typography variant='body2' sx={{ fontSize: "14px" }}>Conjunction Type</Typography>
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="multi-conj-search-bar-conj-type-radio-buttons-group-label"
                        name="multi-conj-search-bar-conj-type-radio-buttons-group"
                        value={ conjType }
                    >
                        <FormControlLabel 
                            value="AND"  
                            control={<Radio size='small'/>} 
                            label="AND" 
                            sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                            // disabled={ condItemIndex===0 || condItems.length===0 ? true : false} 
                            onClick={ ()=>handleConjTypeChange("AND") }
                        />
                        <FormControlLabel 
                            value="OR"   
                            control={<Radio size='small'/>} 
                            label="OR"
                            sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                            // disabled={condItemIndex===0 || condItems.length===0 ? true : false} 
                            onClick={ ()=>handleConjTypeChange("OR") }
                        />
                        <FormControlLabel 
                            value="NONE" 
                            control={<Radio size='small'/>} 
                            label="NONE"
                            sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
                            // checked={ condItems.length===0 || condItemIndex===0 ?true:false} 
                            onClick={ ()=>handleConjTypeChange("NONE") }
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box 
                sx={{ 
                    mt: 1.5, 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    minWidth: "500px", 
                    maxWidth: "900px" 
                }}
            >
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0, mt: 0.3, fontSize: "14px" }}>Condition of</InputLabel>
                    <Select
                        labelId="multi-condition-search-by-select-label"
                        id="multi-condition-search-by-select"
                        InputLabelProps={{ shrink: true }}
                        value={ condType===undefined || ""===condType ? "==" : condType }
                        label="Condition of"
                        onChange={ handleCondTypeChange }
                        sx={{ width: '18ch' }}
                        size='small'
                    >
                        <MenuItem value="==">Choose</MenuItem>
                        <MenuItem value="EQUALS">Equals</MenuItem>
                        <MenuItem value="NOT_EQUALS">Not equals</MenuItem>
                        <MenuItem value="GREATER">Greater</MenuItem>
                        <MenuItem value="GREATER_THAN">Greater than</MenuItem>
                        <MenuItem value="LESS">Less</MenuItem>
                        <MenuItem value="LESS_THEN">Less then</MenuItem>
                        <MenuItem value="BETWEEN">Between</MenuItem>
                        <MenuItem value="NOT">Not</MenuItem>
                        <MenuItem value="IN">In</MenuItem>
                        <MenuItem value="NOT_IN">Not in</MenuItem>
                        <MenuItem value="START_WITH">Start with</MenuItem>
                        <MenuItem value="END_WITH">End with</MenuItem>
                        <MenuItem value="CONTAINS">Contains</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0, mt: 0.3, fontSize: "14px" }}>Condition By</InputLabel>
                    <Select
                        labelId="multi-condition-search-by-select-label"
                        id="multi-condition-search-by-select"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ fontSize: "14px" }}
                        value={ conditionByIndex }
                        label="Condition By"
                        onChange={ e=>handleConditionByChange(e.target.value) }
                        sx={{ width: '25ch'}}
                        size='small'
                    >
                        {searchByItems&&searchByItems.map((item,index)=>{
                            return(
                        <MenuItem value={ index }>{ item.label }</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                { searchByItems[conditionByIndex].element }
                <Button 
                    variant="contained" 
                    color='inherit'
                    startIcon={<CheckIcon color='inherit'/>}
                    onClick={ ()=>handleApply(conditionByIndex) }
                    sx={{ height: "38px"}}
                    size='small'
                >
                    적용
                </Button>
            </Box>
            <Box sx={{ mt: 2, maxWidth: "900px" }}>
                { condItems && condItems.map((cond, index)=>{
                    return (
                <Chip 
                    label={ (cond.conj?cond.conj:"") + ":" + cond.name + ":" + cond.cond + "(" + cond.value + ")" } 
                    color={ condItemIndex===index ? "secondary" : "primary" }
                    variant="outlined" 
                    onDelete={ ()=>handleOnChipDelete(index) } 
                    onClick={ ()=>handleOnChipClick(index) }
                    sx={{ ml: .5, mr: .5, mb: .5 }}
                />
                    )
                })}
            </Box>
            <Box>
                <Button 
                    sx={{ mt: 2 }} 
                    variant="contained" 
                    color='inherit'
                    startIcon={<SearchIcon color='inherit'/>}
                    onClick={ handleSearch }
                    size='small'
                >
                    { props.searchLabel }
                </Button>
            </Box>
        </Stack>
    )
}

export default MultiConditionalSearchBar;