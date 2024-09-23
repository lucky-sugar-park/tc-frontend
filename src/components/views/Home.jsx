import React from 'react';
import { useTheme } from '@mui/material/styles';

const Home = (props) => {

    const theme = useTheme();

    return (
        <div style={{ backgroundColor: theme.palette.background.default, height: 600, width: "100%" }}>
            This is home !!!
        </div>
    )
}

export default Home;