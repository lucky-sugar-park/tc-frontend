import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import SelectableSearchBySearchBar from '../../widgets/bars/SelectableSearchBySearchBar';

import { searchWebHook } from './WebHookApi';

const WebHookSearchView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const handleOnSearch = (searchCondition) => {
        searchWebHook(searchCondition, (webHookList, error)=>{
            if(error===undefined) {
                props.onWebHookListChange(webHookList);
            } else {
                Notifier.warn({ title: "", message: "", modal: true });
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
                { key: "name", value: "name", text: "Name" },
                { key: "url", value: "url", text: "URL" },
                { key: "description", value: "description", text: "Description" },
            ]}
            title="WebHook 검색"
        />
    )
}

export default WebHookSearchView;