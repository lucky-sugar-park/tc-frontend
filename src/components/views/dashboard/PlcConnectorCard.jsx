import React from 'react';
import PropTypes from 'prop-types';

import {
    Avatar,
    Box,
    Grid,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import {
    ArchiveOutlined as ArchiveTwoToneIcon,
    ArrowUpward as ArrowUpwardIcon,
    FileCopyOutlined as FileCopyTwoToneIcon,
    GetAppOutlined as GetAppTwoToneIcon,
    MoreHoriz as MoreHorizIcon,
    PictureAsPdfOutlined as PictureAsPdfTwoToneIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import MainCard from '../../widgets/cards/MainCard';
import SkeletonPlcConnectorCard from './SkeletonPlcConnectorCard';

const PlcConnectorCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOnClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOnClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            { isLoading ? (
                <SkeletonPlcConnectorCard />
            ) : (
                <MainCard
                    border={ false }
                    content={ false }
                    sx={{
                        bgcolor: 'secondary.dark',
                        color: '#fff',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.secondary[800],
                            borderRadius: '50%',
                            top: { xs: -105, sm: -85 },
                            right: { xs: -140, sm: -95 }
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.secondary[800],
                            borderRadius: '50%',
                            top: { xs: -155, sm: -125 },
                            right: { xs: -70, sm: -15 },
                            opacity: 0.5
                        }
                    }}
                >
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                bgcolor: 'secondary.800',
                                                mt: 1
                                            }}
                                        >
                                            <img alt="Notification" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                bgcolor: 'secondary.dark',
                                                color: 'secondary.200',
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={ handleOnClick }
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={ anchorEl }
                                            keepMounted
                                            open={ Boolean(anchorEl) }
                                            onClose={ handleOnClose }
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={ handleOnClose }>
                                                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                                            </MenuItem>
                                            <MenuItem onClick={ handleOnClose }>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                                            </MenuItem>
                                            <MenuItem onClick={ handleOnClose }>
                                                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                                            </MenuItem>
                                            <MenuItem onClick={ handleOnClose }>
                                                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$500.00</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                        sx={{
                                            cursor: 'pointer',
                                            ...theme.typography.smallAvatar,
                                            bgcolor: 'secondary.200',
                                            color: 'secondary.dark'
                                        }}
                                        >
                                        <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'secondary.200'
                                }}
                                >
                                    Registered PlcConnector Count
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </MainCard>
            )}
        </>
    )
}

PlcConnectorCard.propTypes = {
    isLoading: PropTypes.bool
}

export default PlcConnectorCard;