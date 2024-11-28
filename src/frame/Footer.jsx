import React from 'react';

import {
    Box,
    IconButton,
    Tooltip 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

import BottomMenu from "./menu/bottom/BottomMenu";
import {
    Copyright 
} from "../components/widgets";

// const Icons = styled(Box)(({ theme }) => ({
//     display: "flex",
//     gap: "24px",
//     alignItems: "center",
// }));
// backgroundColor: theme.palette.background.footer

const OuterBox = styled(Box)(({ theme }) => ({
    fontSize: '10px',
    width: "100%",
    textAlign: 'justify',
    display: 'flex',
    padding: '0px',
    backgroundColor: theme.palette.background.footer
}))

const InnerBox = styled(Box)(({ theme }) => ({
    // float: 'left',
    fontSize: '10px',
    width: "100%",
    // display: "flex",
    textAlign: 'justify',
}))

export default function Footer (props) {

    const [bottomMenuShow, setBottomMenuShow] = React.useState(false);

    const toggleBottomMenuShow = () => {
        console.log("Clieked on bottom menu !");
        setBottomMenuShow(!bottomMenuShow);
    }

    const handlePersonSecurityPolicyShow = () => {
        console.log("Clicked on handlePersonSecurityPolicy !");
    }

    return (
        <OuterBox>
            <Box style={{ width: "5%" }}>
            </Box>
            <InnerBox>
                <Copyright
                    style={{ padding: 2 }}
                    companyName="WowSoftLab"
                    companyWebSite="http://wowsoftlab.com"
                    personSecurityText="개인정보처리방침"
                    onPersonSecurityPolicyShow={ handlePersonSecurityPolicyShow }
                />
            </InnerBox>
            <Box style={{ width: "5%" }} >
                <Box style={{ padding: 0, paddingTop: 0, float: "right" }}>
                    <Tooltip title="Admin" placement="top">
                        <IconButton onClick={ toggleBottomMenuShow }>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <BottomMenu 
                show={ bottomMenuShow } 
                toggleBottomMenuShow={ toggleBottomMenuShow } 
                right={ 0 } 
                bottom={ 39 }
                { ...props }
            />
        </OuterBox>
    )
}
