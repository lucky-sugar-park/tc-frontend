import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton, Typography } from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';

export function makeColumnDefinitions (props) {
    const ColumnDefinitions = 
    [
        {
            field: "id",
            name: "id",
            hide: true,
            width: 100,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "number",
            headerAlign: "right",
            //filterOperators: [{ value: "=", InputComponentProps: { type: "number" }}, { value: "!=", InputComponentProps: { type: "number" }}, { value: ">", InputComponentProps: { type: "number" }}, { value: ">=", InputComponentProps: { type: "number" }}, { value: "<", InputComponentProps: { type: "number" }}, { value: "<=", InputComponentProps: { type: "number" }}, { value: "isEmpty", InputComponentProps: { type: "number" }}, { value: "isNotEmpty", InputComponentProps: { type: "number" }}, { value: "isAnyOf", InputComponentProps: { type: "number" }}]
        },
        {
            field: "transactionId",
            name: "Transaction ID",
            hide: true,
            width: 150,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }] 
        },
        {
            field: "messageId",
            name: "Message ID",
            hide: true,
            width: 150,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
        },
        {
            field: "name",
            name: "Name",
            hide: true,
            width: 250,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            // filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
        },
        {
            field: "messageType",
            name: "MessageType",
            hide: true,
            width: 200,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
            renderCell: (params) => {
                return (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0 }}>
                    {
                        params.value==="RESPONSE" 
                        ?
                        <IconButton><ReplyIcon fontSize='small'/></IconButton>
                        :
                        <IconButton><SendIcon fontSize='small'/></IconButton>
                    }
                        <Typography variant='body' fontSize="small">{ params.value }</Typography>
                    </Box>
                )
            }
        },
        {
            field: "sender",
            name: "Sender",
            hide: true,
            width: 200,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
        },
        {
            field: "receiver",
            name: "Receiver",
            hide: true,
            width: 200,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
        },
        {
            field: "timestamp",
            name: "Timestamp",
            hide: true,
            width: 300,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "Date",
            align: "left",
            //filterOperators: [{ value: "contains"}, { value: "equals" }, { value: "startsWith" }, { value: "endsWith" }, { value: "isEmpty", requirsFilterValue: false}, { value: "isNotEmpty", requiresFilterValue: false }, { value: "isAnyOf" }]  
            renderCell: (params) => {
                const date=new Date(params.value);
                return (
                    <Typography variant='body'>{ date.toLocaleString() }</Typography>
                )
            }
        },
        {
            field: "dataMap",
            name: "dataMap",
            hide: true,
            width: 100,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: false,
            resizable: true,
            filterable: false,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
            renderCell: (params) => {
                return (
                    <Button 
                        startIcon={ <DetailsIcon /> }
                        onClick={ (event)=>props.handleClick(event, params.value) }
                    >
                        상세보기                    
                    </Button>
                )
            }
        },
        {
            field: "description",
            name: "Description",
            hide: true,
            width: 300,
            minWidth: 50,
            maxWidth: null,
            hidable: true,
            sortable: false,
            resizable: true,
            filterable: false,
            groupable: false,
            pinnable: false,
            editable: false,
            type: "string",
            align: "left",
        },
    ]
    return ColumnDefinitions;
}
