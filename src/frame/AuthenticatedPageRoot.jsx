import React from 'react';

import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const AuthenticatedPageRoot = (props) => {

    var theight = document.documentElement.clientHeight;
    const headerHeight = 60;
    const footerHeight = 37;
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [bodyHeight, setBodyHeight] = React.useState(theight-headerHeight-footerHeight-3);
    const [width, setWidth] = React.useState(document.documentElement.clientWidth-3);

    React.useEffect(()=>{
        window.addEventListener("resize", (e)=>{
            // eslint-disable-next-line react-hooks/exhaustive-deps
            theight = document.documentElement.clientHeight;
            setBodyHeight(theight-headerHeight-footerHeight-3);
            var cwidth = document.documentElement.clientWidth-3;
            setWidth(cwidth);
        });
    }, [])
     
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <SplitPane split="horizontal" allowResize={ true } style={{ height: "100%", width: width }}>
                <Pane key="header-pane" size={ headerHeight + "px"} minSize="0px" maxSize={ headerHeight + "px" }>
                    <Header drawerOpen={ drawerOpen } toggleDrawer={ toggleDrawer } bodyHeight={ bodyHeight } { ...props } />
                </Pane>
                <Pane key="body-pane" size={ bodyHeight + "px"} minSize="500px" maxSize={ bodyHeight + "px" }>
                    <Body 
                        drawerOpen={ drawerOpen } 
                        toggleDrawer={ toggleDrawer } 
                        bodyHeight={ bodyHeight } 
                        footerHeight={ footerHeight }
                        { ...props }
                    />
                </Pane>
                <Pane key="footer-pane" size={ footerHeight + "px"} minSize="0px" maxSize={ footerHeight + "px" }>
                    <Footer { ...props } />
                </Pane>
            </SplitPane>
        </div>
    )
}

export default AuthenticatedPageRoot;