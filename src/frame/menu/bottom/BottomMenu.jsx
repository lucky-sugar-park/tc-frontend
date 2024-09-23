import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
    Box,
    Divider,
    List,
    ListItemButton,
    Typography
} from '@mui/material';

const BottomContextMenu = styled(Box)(({ theme, options }) => ({
    display: options.show?"block":"none",
    position: "fixed",
    zIndex: 1000001,
    width: 240,
    right: options.right,
    bottom: options.bottom,
    float: "left",
    // color: "black",
    border: "1px",
    borderColor: "black",
    background: theme.palette.background.footerMenu,
    // background: 'rgba(255,255,255,.2)'
    // opacity: .5
}));

const BottomMenu = (props) => {

    // cosnt [show, setShow] = React.useState(props.show);

    const menuClicked = (e) => {
        console.log("some menu selected !");
        props.toggleBottomMenuShow();
    }

    return (
        <BottomContextMenu
            onClick={ menuClicked }
            options={{ show: props.show, right: props.right, bottom: props.bottom }}
        >
            <List component="nav">
                <ListItemButton component={ RouterLink } to="/setting/theme" state={{ showAction: true }} >
                    <Typography>Change theme</Typography>
                </ListItemButton>
                <ListItemButton component={RouterLink} to="/themeSelection">
                    <Typography>Manage theme</Typography>
                </ListItemButton>
            </List>
            <Divider />
            <List component="nav">
                <ListItemButton component={RouterLink} to="/monitoring">
                    <Typography>Monitoring</Typography>
                </ListItemButton>
            </List>
            <Divider />
            <List component="nav">
                <ListItemButton component={RouterLink} to="/monitoring">
                    <Typography>Set message filtering</Typography>
                </ListItemButton>
            </List>
        </BottomContextMenu>
    )
}

export default BottomMenu;