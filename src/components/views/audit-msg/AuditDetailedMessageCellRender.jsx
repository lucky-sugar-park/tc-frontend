// import React from 'react';

// import {
//     Box,
//     Button,
//     Popper,
//     Tooltip,
// } from '@mui/material';
// import DetailsIcon from '@mui/icons-material/Details';

// const AuditDetailedMessageCellRender = (props) => {

//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const handleClick = (event) => {
//         console.log("###$$$###=>" + event.currentTarget)
//         setAnchorEl(anchorEl ? null : event.currentTarget);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'msg-detailed-popper' : undefined;

//     return (
//         <div>
//             <Button 
//                 aria-describedby={id}
//                 startIcon={ <DetailsIcon /> }
//                 onClick={ handleClick }
//                 onMouseLeave={ handleClick }
//             >
//                 상세보기                    
//             </Button>

//             <Popper id={ id } open={ open } anchorEl={ anchorEl } sx={{ display: open?"block":"none", width: "450px", height: "500px", zIndex: 1000 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 1, zIndex: 1000 }}>
//                     <pre><code>{ JSON.stringify(props.value, null, 2) }</code></pre>
//                 </Box>
//             </Popper>
//         </div>
//     )
// }

// export default AuditDetailedMessageCellRender;