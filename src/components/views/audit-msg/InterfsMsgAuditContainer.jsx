import React from 'react';
import {
    Box,
    Divider,
    Typography
} from '@mui/material';

import SimpleTab from '../../widgets/tabs/SimpleTab';
import InterfsMessageAuditDataGrid from './InterfsMsgAuditDataGrid';

import InterfsAuditMsgFlashView from './InterfsAuditMsgFlashView';
import InterfsAuditMsgMgmtRuleView from './InterfsAuditMsgMgmtRuleView';

const InterfsMsgAuditContainer = (props) => {
    return (
        
        <Box sx={{ minWidth: "800px", width: "100%", pr: 3, overflowY: 'auto' }} >
            <Box>
                <Typography variant='h7'>인터페이스 메시지 관리</Typography>
                <SimpleTab 
                    tabs={[
                        { label: "이력 메시지관리 규칙" },
                        { label: "이력 메시지 Flash" }
                    ]}
                    panels={[
                        <InterfsAuditMsgMgmtRuleView 
                        />,
                        <InterfsAuditMsgFlashView />
                    ]}
                    sx={{ mt: 2 }}
                />
            </Box>
            <Divider sx={{ mb: 2 }}/>
            <Box sx={{ mb: 1 }}>
                <Typography variant='h7'>인터페이스 이력검색</Typography>
            </Box>
            <InterfsMessageAuditDataGrid 
                height="700px"
                initialRowsCount={ 50 }
            />
        </Box>
    )
}

export default InterfsMsgAuditContainer;