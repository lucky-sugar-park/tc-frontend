import React from 'react';

import { Grid } from '@mui/material';

import VplcCard from './VplcCard';

const VplcListCardView = (props) => {

    const [vplcList, setVplcList] = React.useState(props.vplcList);
    const [ctrlKeyPressed, setAltKeyPressed] = React.useState(false);

    React.useEffect(()=>{
        setVplcList(props.vplcList);
    }, [props.vplcList]);

    React.useEffect(()=>{
        window.document.addEventListener('keydown', handleKeyDown);
        window.document.addEventListener('keyup', handleKeyUp);
        return ()=>{
            window.document.removeEventListener('keydown', handleKeyDown);
            window.document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);

    const handleKeyDown = (e) => {
        if(e.ctrlKey) {
            setAltKeyPressed(true);
        }
    }

    const handleKeyUp = (e) => {
        setAltKeyPressed(false);
    }

    return (
        <Grid container spacing={ vplcList&&vplcList.length>0?2:0 }>
        { vplcList && vplcList.map((vplcInfo, index)=>{
            return (
            
            <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ index} >
                <VplcCard 
                    { ...props }
                    key={ "vplc-" + index }
                    seq={ index }
                    vplcInfo={ vplcInfo } 
                    ctrlKeyPressed={ ctrlKeyPressed }
                    onChecked={ props.onChecked }
                />
            </Grid>
            )
        })}
        </Grid>
    )
}

export default VplcListCardView;