import React from 'react';

import {
    Box,
    Tab,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const SimpleTab = (props) => {

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newvalue) => {
        setTabValue(newvalue);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} { ...props }>
            <TabContext value={ tabValue }>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={ handleTabChange }>
                    {
                        props.tabs && props.tabs.map((tab,index)=>{
                            return (
                                <Tab label={ tab.label } value={ index }/>
                            )
                        })
                    }
                    </TabList>
                </Box>
                <Box>
                    {
                        props.panels && props.panels.map((panel, index)=>{
                            return (
                                <TabPanel value={ index }>
                                    { panel }
                                </TabPanel>            
                            )
                        })
                    }
                </Box>
            </TabContext>
        </Box>
    )
}

export default SimpleTab;