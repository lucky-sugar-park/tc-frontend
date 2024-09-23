import React from 'react';

import {
    Button
} from '@mui/material';

import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import InterfsPropListTable from './InterfsPropListTable';
import HeaderPropsTemplateListView from './HeaderPropsTemplateView';

const InterfsHeaderPropListTable = (props) => {

    const [headers, setHeaders] = React.useState(props.rows);
    const [extChecked, setExtChecked] = React.useState(props.editMode);
    const [openTemplateView, setOpenTemplateView] = React.useState(false);
    const [headerTemplate, setHeaderTemplate] = React.useState(undefined);

    const handleEditModeChange = (editMode) => {
        setExtChecked(editMode);
    }

    const handleHeaderPropsTemplateOpen = () => {
        setOpenTemplateView(true);
    }

    const handleOnHeaderPropsTemplateSelect = () => {
        setOpenTemplateView(false);
        const nheaders=[];
        headerTemplate.headers.forEach((header,index)=>{
            header.oper='N';
            nheaders.push(header);
        });
        setHeaders(nheaders);
    }

    const extensions = [
        <Button 
            size="small" 
            color="inherit" 
            startIcon={<Grid3x3Icon color='inherit'/>} 
            variant='contained' 
            sx={{ mr: 1 }}
            onClick={ handleHeaderPropsTemplateOpen }
            disabled={ !extChecked }
        >
            템플릿
        </Button>
    ]

    React.useEffect(()=>{
        if(props.rows===undefined) return;
        setHeaders(props.rows);
    }, [props.rows])

    const handleHeaderTemplateSelect = (template) => {
        setHeaderTemplate(template);
    }

    return (
        <>
            <InterfsPropListTable 
                { ...props }
                title={ props.title===undefined ? "인터페이스 헤더" : props.title }
                rows={ headers }
                extensions={ extensions }
                onDisabled={ handleEditModeChange }
            />
            <ConfirmationModalDialog 
                open={ openTemplateView }
                onClose={ ()=>setOpenTemplateView(false) }
                onCancel={ ()=>setOpenTemplateView(false) }
                onConfirm={ handleOnHeaderPropsTemplateSelect }
                title="Header 템플릿 선택"
                confirmation={ true }
                setOpen={ ()=>setOpenTemplateView(false) }
                titleDivider
                actionDivider
            >
                <HeaderPropsTemplateListView 
                    onTemplateSelect={ handleHeaderTemplateSelect }
                />
            </ConfirmationModalDialog>
        </>
    )
}

export default InterfsHeaderPropListTable;