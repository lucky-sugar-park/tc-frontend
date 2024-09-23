import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Link, Typography } from '@mui/material';

const Copyright = (props) => {

    const theme = useTheme();

    const {
        companyName,
        companyWebSite,
        onPersonSecurityPolicyShow,
        personSecurityText
    } = props;

    return (
        <Box 
            style={{ 
            width: "90%",
            position: "fixed",
            bottom: 0,
            padding: 10, 
            alignContent: "center", 
            alignItems: "center",
            backgroundColor: theme.palette.background.footer 
        }}
    >
        <Typography sx={{ fontSize: 12 }} align="center">
            &nbsp;
            { 'Copyright @ ' }
            <Link color="inherit" href={ companyWebSite } style={{ textDecoration: "none" }}>
                { companyName }
            </Link>
            { " " + new Date().getFullYear() }
            { '. All rights reserved.'}
            &nbsp;
            |
            &nbsp;
            <Link color="inherit" onClick={ onPersonSecurityPolicyShow } style={{ textDecoration: "none", cursor:"pointer" }}>
                { personSecurityText }
            </Link>
        </Typography>
    </Box>
    )
}

export default Copyright;
