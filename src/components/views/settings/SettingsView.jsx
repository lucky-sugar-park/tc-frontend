import React from 'react';

import ThemeSettings from './ThemeSettings';
import AlertSettings from './AlertSettings';
import SseSettings from './SseSettings';
import PersistentSettings from './PersistentSettings';

const SettingsView = (props) => {
    return (
        <div>
            <ThemeSettings 
                showAction={ true }
                { ...props }
            />
            <AlertSettings/>
            <SseSettings />
            <PersistentSettings />
        </div>
    )
}

export default SettingsView;