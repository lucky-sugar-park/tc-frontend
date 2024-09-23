import React from 'react';

const BodyLayoutType1 = (props) => {
    return (
        <div 
            style={{ 
                width: "99.4%", 
                height: (props.bodyHeight-props.footerHeight-22) + "px", 
                marginLeft: "10px", 
                marginTop: "15px", 
                marginRight: "auto",
                scrollbarWidth: 'thin', 
                // scrollbarGutter: 'stable both-edges',
                overflow: "auto" 
            }} 
        >
            { props.children }
        </div>
    );
}

export default BodyLayoutType1;