import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Box,
    Breadcrumbs,
    Link,
    Typography
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const BreadcrumbNav = (props) => {

    const { routes } = props;

    const theme = useTheme();

    const crumbs = useBreadcrumbs(routes);
    const breadcrumbs = [];

    crumbs.map(({
        match,
        breadcrumb
    }, index) => {
        breadcrumbs.push(
            (index + 1 === crumbs.length) ? (
                <Typography key={ index } color='text.secondary' fontSize='13px'>
                    { breadcrumb }
                </Typography>
            ) : (
                <Link 
                    component={ RouterLink }
                    underline='hover'
                    key={ index }
                    color='inherit'
                    to={ match.pathname }
                >
                    <Typography color='text.secondary' fontSize='13px'>
                        { breadcrumb }
                    </Typography>
                </Link>
            )
        )
    });

    return (
        <Box style={{ marginLeft: 0, alignItems: "center", paddingLeft: 12, paddingTop: 9, height: 35, backgroundColor: theme.palette.background.nav }}>
            <Breadcrumbs
                separator={ <NavigateNextIcon fontSize="small"/> }
                aria-label='breadcrumb'
            >
                { breadcrumbs }
            </Breadcrumbs>
        </Box>
    )
}

const typography = {
    body2: {
        fontSize: [12, '!important']
    }
}

export default BreadcrumbNav;