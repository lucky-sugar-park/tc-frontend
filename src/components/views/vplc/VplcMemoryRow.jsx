import React from 'react';

import { 
    TableCell, 
    TableRow, 
    Typography
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styled from '@emotion/styled';

const StyleTableCell = styled(TableCell)(({ theme }) => ({
    border: '1px solid'
}));

const VplcMemoryRow = (props) => {

    const [selected, setSelected] = React.useState(false);
    const [word, setWord] = React.useState(props.word);

    React.useEffect(()=>{
        setWord(props.word);
    }, [props.word]);

    return (
        <TableRow
            sx={{
                border: "1px solid #eeeeee",
                "&.MuiTableRow-hover": {
                    cursor: "pointer"
                }
            }}
            onClick={ (e)=>setSelected(true) }
            hover
            selected={ selected }
        >
            <StyleTableCell component="th" scope="row" align="left">
                <ArrowRightIcon sx={{ fontSize: 14, display: selected ? "block" : "none" }} />
            </StyleTableCell>
            <StyleTableCell align="center"><Typography fontSize={ 14 }>{ word.address }</Typography></StyleTableCell>
            { word && word.bitValues.map((bitVal,index)=>{
                return (
                    <StyleTableCell 
                        key={ index } 
                        align='center'
                        sx={{ 
                            backgroundColor: bitVal==='1' ? "secondary.light" : "", 
                            color: bitVal==='1' ? "secondary.contrastText" : "" 
                        }}
                    >
                        <Typography fontSize={ 14 }>{ bitVal }</Typography>
                    </StyleTableCell>
                )
            })}
            <StyleTableCell align='center'><Typography fontSize={ 14 }>{ word.highVal }</Typography></StyleTableCell>
            <StyleTableCell align='center'><Typography fontSize={ 14 }>{ word.lowVal }</Typography></StyleTableCell>
            <StyleTableCell align='center'><Typography fontSize={ 14 }>{ word.allVal }</Typography></StyleTableCell>
            <StyleTableCell align='center'><Typography fontSize={ 14 }>{ word.asciiVal }</Typography></StyleTableCell>
        </TableRow>
    )
}

export default VplcMemoryRow;