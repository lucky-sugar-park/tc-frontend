import React from 'react';

import { styled, useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';

import getIcon from '../../../components/widgets/icons/IconMaps';
const menus = require("../../../config/DrawerMenu.json");

const DrawerMenuList = (props) => {

    const theme = useTheme();

    const [menuList, setMenuList] = React.useState([]);
    const [menuSelected, setMenuSelected]  = React.useState([]);

    const onMenuChange = props.onMenuChange;

    React.useEffect(()=>{
        setMenuList(menus);
        setMenuSelected([
            true, false, false, false, false, false, false, false, false, false, false, false, false
        ]);
    }, [menuList]);

    const handleOnMenuSelectionChanged = (name, num) => {
        var idx;
        for(idx=0;idx<13;idx++) {
            if(num===idx) menuSelected[idx]=true;
            else menuSelected[idx]=false;
        }
        onMenuChange(name, num);
    }

    return(
        <List component="div">
        {
            menuList.map((menu, index)=>{
                const Icon=getIcon(menu.icon);
                if(menu.type==="Divider") {
                    return <Divider key={ "drawer-menu-" + index } sx={{ my: 1 }} />
                } else {
                    return (

            <Tooltip key={ "drawer-menu-" + index} title={ menu.name } arrow={ true } placement="right">
                <ListItemButton 
                    sx={{ 
                        backgroundColor: menuSelected[index] ? theme.menu.main.selected : "",
                        ":hover": {
                            backgroundColor: theme.menu.main.hover,
                        }
                    }}
                    onClick={ () => handleOnMenuSelectionChanged(menu.name, index) }
                >
                    <ListItemIcon >
                        <Icon />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
            
                    )
                }
            })
        }
            {/* <Divider sx={{ my: 1 }} /> */}
        </List>
    );
}

export default DrawerMenuList;