import React from 'react';

import InterfsPropListTable from './InterfsPropListTable';

const InterfsDataPropListTable = (props) => {

    return (
        <InterfsPropListTable 
            title={ props.title===undefined ? "연계 데이터 정보" : props.title }
            { ...props } 
        />
    )
}

export default InterfsDataPropListTable;