import React from 'react';

import { Grid } from '@mui/material';

import PlcConnectorCard from './PlcConnectorCard';

const PlcListCardView = (props) => {

    const [plcConList, setPlcConList] = React.useState(props.plcConList);
    const [ctrlKeyPressed, setAltKeyPressed] = React.useState(false);

    React.useEffect(()=>{
        setPlcConList(props.plcConList);
    }, [props.plcConList]);

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
        <Grid container spacing={ plcConList&&plcConList.length>0?2:0 }>
        {
            plcConList && plcConList.map((plcConInfo,index)=>{
                return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PlcConnectorCard
                    { ...props }
                    key={ "plc-connector-" + index }
                    seq={ index }
                    plcConInfo={ plcConInfo } 
                    ctrlKeyPressed={ ctrlKeyPressed }
                    onChecked={ props.onChecked }
                />
            </Grid>
                )
            })
        }
        </Grid>
    )
}

export default PlcListCardView;