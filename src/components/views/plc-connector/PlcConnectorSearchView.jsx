import React from 'react';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import SelectableSearchBySearchBar from '../../widgets/bars/SelectableSearchBySearchBar';

import { searchPlcConnector } from './PlcConnectorApi';

const PlcConnectorSearchView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const handleOnSearch = (searchCondition) => {
        searchPlcConnector(searchCondition, (plcList, error)=>{
            if(error===undefined) {
                props.onPlcListChange(plcList);
            } else {
                Notifier.warn({ 
                    title: "Fail to search PLC Connectores", 
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
                { key: "name", value: "name", text: "Name" },
                { key: "manufacturer", value: "manufacturer", text: "Manufacturer" },
                { key: "status1", value: "status1", text: "PLC Info Status" },
                { key: "status2", value: "status2", text: "PLC Oper Status" },
                { key: "hostIp", value: "hostIp", text: "Host IP Address" },
                { key: "messageFrameFormat", value: "messageFrameFormat", text: "Message Frame Format" },
                { key: "description", value: "description", text: "Description" },
            ]}
            title="PLC Connector 검색"
        />
    );
}

export default PlcConnectorSearchView;