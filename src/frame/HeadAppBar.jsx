import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

import {
    Bookmark,
    StyledSearchBar
} from '../components/widgets';

import AboutDialog from '../components/views/about/AboutDialog';
import SettingsDialog from '../components/views/settings/SettingsDialog';

import { logout } from '../components/views/auth/AuthLoginStoreInit'; 

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: 0
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "12px",
    alignItems: "center",
}));

const HeadAppBar = (props) => {

    const { 
        title,
        searchLabel,
        searchActionIcon,
        // userId,
        // onNewEmailsShowReq,
        // onNewNotificationsShowReq,
        // onMyProfileShowReq,
        // onMyAccountInfoShowReq,
        toggleDrawer
    } = props;

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [aboutOpen, setAboutOpen] = React.useState(false);

    const doSearch  = props.doSearchCallback;
    const doLogout = (email) => dispatch(logout(email));

    const authInfo = useSelector(state=>state.auth);

    const handleSettingsDialogClose = () => {
        setSettingsOpen(false);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnLogout = () => {
        doLogout(authInfo.loginInfo.data.user.email);
        handleClose();
    }

    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <AppBar position="absolute">
                <Toolbar sx={{ pr: '20px' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={ toggleDrawer }
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={ RouterLink }
                        to="/"
                        color="common.white"
                        sx={{ display: { xs: 'none', sm: 'block' }, textDecoration: "none" }}
                    >
                        { title }
                    </Typography>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex'}, ml: 10 }}>
                        <Bookmark />
                    </Box>
                    {/* <StyledSearchBar 
                        doSearchCallback={ doSearch } 
                        label={ searchLabel }
                        actionIcon={searchActionIcon}
                    /> */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/* <NotificationSummaryBar
                        value={ userId }
                        onNewEmailClicked={ onNewEmailsShowReq }
                        onNewNotificationClicked={ onNewNotificationsShowReq }
                        onMyProfileClicked={ onMyProfileShowReq }
                        onMyAccountClicked={ onMyAccountInfoShowReq }
                    /> */}
                    <Icons>
                        <Tooltip title="QNA">
                            <QuestionAnswerIcon 
                                fontSize="medium"
                                sx={{ cursor: "pointer"}}
                            />
                        </Tooltip>
                        <Tooltip title="About">
                            <InfoIcon 
                                fontSize="medium"
                                onClick={e=>setAboutOpen(!aboutOpen)}
                                sx={{ cursor: "pointer"}}
                            />
                        </Tooltip>
                        <Tooltip title="Setting">
                            <SettingsIcon 
                                fontSize="medium" 
                                onClick={e=>setSettingsOpen(!settingsOpen)}
                                sx={{ cursor: "pointer" }}
                            />
                        </Tooltip>
                        <Tooltip title={ authInfo && authInfo.loginInfo.data.user.email }>
                            <Avatar 
                                sx={{ width: 36, height: 36, cursor: "pointer", ml: 2 }}
                                onClick={ handleMenu }
                                src='/assets/images/avatars/avatar_25.jpg'
                            />
                        </Tooltip>
                    </Icons>
                </Toolbar>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
                </Menu>
                <SettingsDialog 
                    open={settingsOpen}
                    handleClose={ handleSettingsDialogClose }
                    orgThemeName={props.selectedThemeInfo.name}
                    {...props}
                />
                <AboutDialog
                    open={aboutOpen}
                    onClose={e=>setAboutOpen(false)}
                />
            </AppBar>
        </Box>
    )
}

export default HeadAppBar;