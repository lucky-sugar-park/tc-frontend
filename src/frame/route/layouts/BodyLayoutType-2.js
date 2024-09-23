import React from 'react';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane';

const BodyLayoutType2 = (props) => {
    var sidebar = props.createSidebar();
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
                    { sidebar }
                </Pane>
                <Pane size="85%" minSize="60%" maxSize="100%">
                    <div>{ props.children }</div>
                </Pane>
            </SplitPane>
        </div>
    );
}

export default BodyLayoutType2;