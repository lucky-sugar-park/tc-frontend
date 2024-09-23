import React from 'react';
import { Link } from 'react-router-dom';

import {
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

import AuthWrapper from './AuthWrapper';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from '../Logo';
import AuthLogin from './AuthLogin';
import AuthFooter from './AuthFooter';

const Login = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="logo" style={{ textDecoration: 'none' }}>
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="secondary.main" gutterBottom variant={downMD ? 'h4' : 'h3'}>
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/user/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default Login;