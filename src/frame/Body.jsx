import React from 'react';
import { useTheme } from '@mui/material/styles';

import BodyRouter from './route/BodyRouter';

import {
    BreadcrumbNav 
} from '../components/widgets';

const Body = (props) => {

    const theme = useTheme();

    const [drawerOpen, setDrawerOpen] = React.useState(props.drawerOpen);

    React.useEffect(()=>{
        setDrawerOpen(props.drawerOpen);
    }, [props.drawerOpen]);

    const marginLeft = drawerOpen ? props.drawerWidth-1 : 56;

    return (
        <div style={{ marginLeft: marginLeft }}>
            <BreadcrumbNav />
            <BodyRouter { ...props } />
        </div>
    )
}

export default Body;