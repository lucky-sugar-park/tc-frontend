import React from 'react';
import {
    Container,
    Box,
    Button,
    Typography
} from '@mui/material';

import RouterLink from '../../utils/router-link';
import Svg404 from '../../assets/illustrations/illustration_404.svg';

const NotFound = (props) => {

    return (
        <>
            <Container>
                <Box
                    sx={{
                        py: 12,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.
                    </Typography>

                    <Box
                        component="img"
                        src={ Svg404 }
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 2, sm: 5 },
                        }}
                    >
                    </Box>

                    <Button href="/" size="large" variant="contained" component={RouterLink} sx={{ mt: 0 }}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default NotFound;