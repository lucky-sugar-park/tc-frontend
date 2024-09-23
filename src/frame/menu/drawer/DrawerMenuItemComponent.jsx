import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { useTheme } from '@mui/material/styles';


const DrawerMenuItemComponent  = (props) => {

    const theme = useTheme();

    const { className, onClick, link, state, children } = props

    const handleOnclick = (e, seq) => {
        if(onClick!==undefined) onClick(e);
        props.onSelect(seq);
    }

    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (
            <ListItemButton
                button
                // className={ className }
                children={ children }
                onClick={ (e)=>handleOnclick(e, props.seq) }
                slotProps={{
                }}
                sx={{
                    width: "225px",
                    paddingLeft: theme.spacing(2),
                    backgroundColor: props.selected ? (props.level===1 ? theme.menu.level1.selected:theme.menu.level2.selected) : "",
                    ":hover": {
                        backgroundColor: (props.level===1 ? theme.menu.level1.hover:theme.menu.level2.hover)
                    }
                }}
            />
        )
    }

    // Return a LitItem with a link component
    return (
        <ListItem
            className={ className }
            children={ children }
            // component={forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref} />)}
            // component={forwardRef((props: NavLinkProps, ref: any) => <NavLink to={{ pathname: '', state: {state}}} />)}
            component={ RouterLink }
            to={{ pathname: link, state: state}}
            onClick={ ()=>props.onSelect(props.seq) }
            // autoFocus={true}
            // to={ link }
            // state={ state }
            slotProps={{
            }}
            sx={{
                width: "225px",
                paddingLeft: theme.spacing(2),
                backgroundColor: props.selected ? (props.level===1 ? theme.menu.level1.selected:theme.menu.level2.selected) : "",
                ":hover": {
                    backgroundColor: (props.level===1 ? theme.menu.level1.hover:theme.menu.level2.hover)
                },
                // "&.active": {
                //     background: 'rgba(255, 255, 255, 0)',
                //     '& .MuiListItemIcon-root': {
                //         color: theme.palette.success.contrastText,
                //     },
                // },
            }}
        />
    )
}

export default DrawerMenuItemComponent;
