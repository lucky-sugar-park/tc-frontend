import React from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane';

const BodyLayoutType3 = (props) => {

    var leftbar = props.createSidebar();
    var rghtbar = props.createRightbar();
    return (
        <div
            style={{ 
                width: "99.4%", 
                height: (props.bodyHeight-props.footerHeight) + "px", 
                marginLeft: "10px", 
                marginTop: "15px", 
                marginRight: "auto",
                scrollbarWidth: 'thin', 
                overflow: "auto" 
            }} 
        >
            <SplitPane split="vertical" primary="second" allowResize={true}>
                <Pane size="15%" minSize="200px" maxSize="600px">
                    { leftbar }
                </Pane>
                <Pane size="70%" minSize="60%" maxSize="100%">
                    <div>{ props.children }</div>
                </Pane>
                <Pane size="15%" minSize="200px" maxSize="600px">
                    { rghtbar }
                </Pane>
            </SplitPane>
        </div>
    );
}

export default BodyLayoutType3;