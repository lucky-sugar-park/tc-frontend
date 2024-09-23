import React, { Fragment } from 'react';

import {
    Box,
    Button,
    Tooltip,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import { findInterfaceByName, searchInterface, sendIfsvcRequest, sendIfsvcRequestAndReply } from './InterfsApi';
import InterfsSvcTestRequestView from './InterfsSvcTestRequestView';
import InterfsSvcTestResponseView from './InterfsSvcTestResponseView';

const InterfsSvcRequestTestView = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [interfsList, setInterfsList] = React.useState([]);
    const [selectedNum, setSelectedNum] = React.useState(0);
    const [request, setRequest] = React.useState({
        requestJson: "", requestType: ""
    });
    const [response, setResponse] = React.useState("");

    const interfsItems = React.useMemo(()=>{
        const items = [];
        if(interfsList!==undefined&&typeof(interfsList)===typeof([])) {
            interfsList.forEach((intfs, index)=>{
                items.push({
                    seq: index,
                    id: intfs.id,
                    name: intfs.name
                });
            })
        }
        return items;
    }, [interfsList]);

    React.useEffect(()=>{
        fetchInterfsListAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(()=>{
        if(props.interfs===undefined) return;
        // retrieval dialog에서 넘어온 경우임
        interfsList&&interfsList.forEach((intfs, index)=>{
            if(props.interfs.id===intfs.id) {
                setSelectedNum(index);
                return;
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.interfs]);

    const fetchInterfsListAll = () => {
        const searchCondition = {
            conditions: [
                {
                    name: "interfaceType",
                    condType: "IN",
                    conjType: "NONE",
                    value: ["READ", "WRITE"]
                }
            ],
            pageInfo: {
                page: 0,
                size: 10,
                sortDirection: "ASCENDING",
                sortBy: [ "id", "name" ]
            }
        };

        searchInterface(searchCondition, (interfsList, error)=>{
            if(error===undefined) {
                setInterfsList(interfsList);
            } else {
                Notifier.warn({
                    title: "Fail to fetch interface list",
                    message: "Fail to fetch interface list from server. cause: " + error,
                    modal: true
                });
            }
        });
    }

    const handleOnInterfsSelectionChange = (seq) => {
        setSelectedNum(seq);
    }

    const handleOnRequestJsonChange = (requestJson, requestType) => {
        if(requestJson!==undefined) {
            setRequest({ ...request, json: requestJson});
        }
        if(requestType!==undefined) {
            setRequest({ ...request, type: requestType});
        }
    }

    const handleOnTestResult = (response, error) => {
        if(error===undefined) {
            Notifier.info({
                title: "Success testing interface request message",
                message: "Interface request test is done successfully [" + interfsList[selectedNum].name + "]",
                modal: false
            });
            setResponse(response);
        } else {
            Notifier.warn({
                title: "Fail testing Interface Request message.",
                message: "Fail to test process Interface Request message. cause: " + error,
                modal: true
            })
        }
    }

    const handleOnSubmit = () => {
        switch(request.type)    {
            case "REQUEST_AND_REPLY" :
                sendIfsvcRequestAndReply(JSON.parse(request.json), (response, error)=>{
                    handleOnTestResult(response, error);
                });
                break;
            case "REQUEST_ONLY" :
            default: 
                sendIfsvcRequest(JSON.parse(request.json), (reply, error)=>{
                    handleOnTestResult(reply, error);
                });
                break;
        }
    }

    const handleOnRetrievalInterfaceSelected = (seq, interfsName) => {
        if(props.onInterfsRetrievalDialogOpen===undefined) {
            Notifier.info({
                title: "Interface retrieval blocked",
                message: "Cannot retireve Interface because this test dialog is come from retrieval dialog.",
                modal: true
            });
            return;
        }

        props.onInterfsRetrievalDialogOpen();
        if(seq!==undefined) {
            if(props.onInterfsChange !== undefined) props.onInterfsChange(interfsList[selectedNum]);
        } else if(interfsName!==undefined) {
            findInterfaceByName(interfsName, (interfs, error)=>{
                if(error===undefined) {
                    if(props.onInterfsChange !== undefined) props.onInterfsChange(interfs);
                } else {
                    Notifier.warn({
                        title: "Fail fetching Interface",
                        message: "Fail fetching Interface name [" + interfsName + "], cause: " + error,
                        modal: true
                    });
                }
            });
        }
    }

    return (
        <>
        <Box sx={{  }}>
            <Box>
                <Typography>인터페이스 동작 테스트</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <InterfsSvcTestRequestView
                    interfsItems={ interfsItems }
                    selectedNum={ selectedNum }
                    selectedInterfsInfo={ interfsList&&interfsList[selectedNum] }
                    onInterfsSelectionChange={ handleOnInterfsSelectionChange }
                    onRequestJsonChange={ handleOnRequestJsonChange }
                    onRetrievalInterfaceSelected={ handleOnRetrievalInterfaceSelected }
                    // { ...props }
                />
                <InterfsSvcTestResponseView
                    interfsName={ interfsList.length>0&&interfsList[selectedNum].replyName }
                    response={ response }
                    onRetrievalInterfaceSelected={ handleOnRetrievalInterfaceSelected }
                    // { ...props }
                />
            </Box>
            <Box sx={{ mt: 1, ml: 1 }}>
                { props.onClose&&
                <Button
                    size='small'
                    variant='contained'
                    color='secondary'
                    startIcon={ <CloseIcon /> }
                    onClick={ props.onClose }
                >
                    Close
                </Button>
                }
                <Button
                    size='small'
                    variant='contained'
                    color='primary'
                    startIcon={ <SendIcon />}
                    onClick={ handleOnSubmit }
                >
                    Send Request
                </Button>
            </Box>
        </Box>
        </>
    )
}

export default InterfsSvcRequestTestView;