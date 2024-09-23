import React from 'react';
import {
    Collapse,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DrawerMenuItemComponent from './DrawerMenuItemComponent';
import { useTheme } from '@mui/material/styles';

const DrawerSubMenuItem = (props) => {

    const theme = useTheme();

    const { type, name, link, Icon, items = [], state } = props;
    const classes = useStyles;

    const isExpandable = items && items.length > 0;
    
    const [open, setOpen] = React.useState(false);
    const [selectedChildMenuNum, setSelectedChildMenuNum] = React.useState(-1);

    React.useEffect(()=>{
        setSelectedChildMenuNum(-1);
    }, [props.selected])

    const handleOnMouseOut = () => {
        setOpen(false);
    }

    const handleOnMouseIn = () => {
        // setOpen(true);
    }

    const toggleOpenClose = () => {
        setOpen(!open);
    }

    const menuItemRoot = () => {
        if(type === "Divider") return ( <Divider /> );
        return (
            <DrawerMenuItemComponent 
                key={ name } 
                // className={ classes.menuItem } 
                link={ link } 
                state={ state }
                { ...props }
            >
                { /* Display an icon if any */}
                {
                    !!Icon && (
                <ListItemIcon 
                    sx={{ 
                    }}
                >
                    <Icon fontSize='small' color="action" />
                </ListItemIcon>
                    )
                }
                <ListItemText 
                    // 아이콘이 있으면 글자를 오른쪽으로 들여씀
                    inset={ Icon!==undefined }
                    primary={
                        <Typography type="body2" sx={{ fontSize: 14 }}>{ name }</Typography>
                    }
                    sx={{ 
                        mt: 0.2, mb: 0.2,
                        paddingLeft: theme.spacing(0), 
                        marginLeft: theme.spacing(0),
                        // ".MuiListItemText-inset": {
                        // } 
                    }}
                />
                { /* Display the expand menu if the item has children */}
                { isExpandable &&  open && <ExpandLessIcon onClick={ toggleOpenClose } fontSize='small' /> }
                { isExpandable && !open && <ExpandMoreIcon onClick={ toggleOpenClose } fontSize='small' /> }
            </DrawerMenuItemComponent>
        )
    };

    const handleOnChildMenuSelect = (num) => {
        setSelectedChildMenuNum(num);
    }

    const menuItemChildren = isExpandable ? (
        <Collapse in={ open } timeout='auto' unmountOnExit>
            <Divider />
            <List component='div' disablePadding>
                {
                    items.map((item, index)=>{
                        return (
                            <DrawerSubMenuItem 
                                { ...item } 
                                key={ index } 
                                seq={ index }
                                level={ props.level+1 }
                                Icon={ item.icon }
                                selected={ (props.selected&&selectedChildMenuNum===index) ? true : false }
                                onSelect={ handleOnChildMenuSelect }
                            />
                        )
                    })
                }
            </List>
        </Collapse>
    ) : null;

    return (
        <div onMouseLeave={ handleOnMouseOut } onMouseOver={ handleOnMouseIn }>
            { menuItemRoot() }
            { menuItemChildren }
        </div>
    );
}

const useStyles = {
    menuItem: {
        // '&.active': {
        //     background: 'rgba(0, 0, 0, 0)',
        //     '& .MuiListItemIcon-root': {
        //         color: '#fff',
        //     },
        // },
        margineTop: 0
    },
    menuItemIcon: {
        // color: '#97c05c'
    },
} 

export default DrawerSubMenuItem;