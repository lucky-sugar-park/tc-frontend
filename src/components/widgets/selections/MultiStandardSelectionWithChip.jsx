import React from 'react';

import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@emotion/react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {

    return {
        fontWeight:
            personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
}

const MultiStandardSelectWithChip = (props) => {

    const [selections, setSelections] = React.useState(props.selections ? props.selections : []);

    const theme = useTheme();

    const handleOnChanged = (event) => {
        const {
            target: { value },
        } = event;
        var sels = typeof value === 'string' ? value.split(',') : value;
        setSelections(sels)
        props.onSelectionChanged(sels);
    }

    const handleOnDeleted = (event, value) => {
        const temp = [];
        selections.forEach(selection=>{
            if(selection!==value) {
                temp.push(selection);
            }
        });
        setSelections(temp);
    }

    return (
        <FormControl required variant='standard' sx={{ minWidth: props.minWidth, maxWidth: props.minWidth, p: 0, ml: 0 }}>
            <InputLabel id={props.id_prefix+"-select-standard-label"} shrink={props.shrink} sx={{ ml: 2, mt: -1, fontSize: 14 }}>{props.label}</InputLabel>
            <Select
                labelId={props.id_prefix+"select-standard-label"}
                id={props.id_prefix+"select-standard"}
                label={props.label}
                multiple
                disabled={props.disabled?props.disabled:false}
                value={ selections }
                input={<OutlinedInput id={props.id_prefix+"-select-multiple-chip"} notched label={props.label} />}
                onChange={handleOnChanged}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    { selected.map((value) => (
                        <Chip 
                            key={value} 
                            label={value} 
                            size="small"
                            onDelete={(event)=>handleOnDeleted(event, value)}
                            onMouseDown={(e)=>{e.stopPropagation();}}
                        />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ fontSize: 14 }}
                size='small'
            >
                <MenuItem disabled value=""><em>Placeholder</em></MenuItem>
                {
                    props.items && props.items.map((item, index)=>{
                        return (
                            <MenuItem
                                key={ item.key }
                                value={ item.value }
                                style={ getStyles(item.value, selections, theme) }
                                sx={{ fontSize: 14 }}
                            >
                                { item.text }
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default MultiStandardSelectWithChip;