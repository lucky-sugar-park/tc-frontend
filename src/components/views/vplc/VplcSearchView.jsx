import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import SelectableSearchBySearchBar from '../../widgets/bars/SelectableSearchBySearchBar';

import { searchVirtualPlc } from './VplcApi';

const VplcSearchView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const handleOnSearch = (searchCondition) => {
        searchVirtualPlc(searchCondition, (vplcList, error) => {
            if(error===undefined) {
                props.onVplcListChange(vplcList);
            } else {
                Notifier.warn({ 
                    title: "Fail to search Virtual PLCs", 
                    message: "Fail to search. Cause: [ " + error + " ]", 
                    modal: true 
                });
            }
        });
    }

    return (
        <SelectableSearchBySearchBar 
            { ...props }
            defaultSearchBy="name"
            hideSearchBy={ false }
            onSearch={ handleOnSearch }
            sortBy={["id", "name"]}
            searchByMenuItems={[
                { key: "id", value: "id", text: "ID" },
                { key: "name", value: "name", text: "Name" },
                { key: "ipAddress", value: "ipAddress", text: "IP Address" },
                { key: "frameFormat", value: "frameFormat", text: "Frame Format" },
                { key: "manufacturer", value: "manufacturer", text: "Manufacturer" },
                { key: "description", value: "description", text: "Description" }
            ]}
            title={ props.title && props.title }
        />
    )
}

export default VplcSearchView;