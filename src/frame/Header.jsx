import TuneIcon from '@mui/icons-material/Tune';

import React from 'react';
import DrawerMenu from './menu/drawer/DrawerMenu';

import HeadAppBar from './HeadAppBar';

const Header = (props) => {

    const doSearch = (keyword)=>{
        console.log("doSerch==>" + keyword);
    }

    const handleNewEmailsShow = (userId) => {
        console.log("userId==>" + userId);
    }

    const handleNewNotificationsShow = (userId) => {
        console.log("userId==>" + userId);
    }

    const handleMyProfileShow = (userId) => {
        console.log("userId==>" + userId);
    }

    const handleMyAccountInfoShow = (userId) => {
        console.log("userId==>" + userId);
    }

    return (
        <>
            <HeadAppBar 
                title="Pilot System"
                doSearchCallback={ doSearch }
                searchLabel="Search..."
                searchActionIcon={<TuneIcon key="" sx={{ color: "#FFFFFF" }}/>}
                userId="ispark"
                onNewEmailsShowReq={handleNewEmailsShow}
                onNewNotificationsShowReq={ handleNewNotificationsShow }
                onMyProfileShowReq={ handleMyProfileShow }
                onMyAccountInfoShowReq={ handleMyAccountInfoShow }
                toggleDrawer={ props.toggleDrawer }
                { ...props }
            />
            <DrawerMenu 
                open={ props.drawerOpen } 
                toggleDrawer={ props.toggleDrawer } 
                { ...props } 
            />
        </>
    )
}

export default Header;