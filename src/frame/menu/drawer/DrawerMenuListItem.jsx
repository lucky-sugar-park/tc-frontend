// import * as React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';

// import DashboardIcon from '@mui/icons-material/Dashboard';
// import DataObjectIcon from '@mui/icons-material/DataObject';
// import FactCheckIcon from '@mui/icons-material/FactCheck';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import LayersIcon from '@mui/icons-material/Layers';

// import {
//   ConveyorIcon,
//   ForkLiftIcon,
//   MonitorWaveformIcon
// } from 'common/CustomIcons';

// const StyledTooltip = styled(Tooltip)(({ theme }) =>({
//   // tooltipPlacementTop: {
//   //   margin: "0px 0",
//   //   padding: 0
//   // },
//   // tooltipPlacementBottom: {
//   //   margin: "0px 0",
//   //   padding: 0
//   // }
// }));

// var changeListener = undefined;

// // {{/* 3D 모델화면 전환 시에는 모니터링에 적합한 테마로 함께 전환되어야 한다 */}}
// const mainListItems = (
//   <React.Fragment>
//     <StyledTooltip title="기준정보" arrow="true" placement="right">
//       <ListItemButton component={RouterLink} to="/monitoring" style={{ backgroundColor: "#d3d3d3"}}>
//         <ListItemIcon >
//           <DataObjectIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="기준정보" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="자재관리" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <LayersIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="자재관리" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="설비관리" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <PrecisionManufacturingIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="설비관리" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="생산관리" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <ConveyorIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="생산관리" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="물류관리" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <ForkLiftIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="물류관리" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <Divider sx={{ my: 1 }} />

//     <StyledTooltip title="품질관리" arrow="true" placement="right">
//       <ListItemButton component={RouterLink} to="/workOrder">
//         <ListItemIcon>
//           <FactCheckIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="품질관리" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="대시보드" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="대시보드" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="모니터링" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <MonitorWaveformIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="" /> */}
//       </ListItemButton>
//     </StyledTooltip>

//     <StyledTooltip title="리포트" arrow="true" placement="right">
//       <ListItemButton>
//         <ListItemIcon>
//           <InsertChartIcon />
//         </ListItemIcon>
//         {/* <ListItemText primary="리포트" /> */}
//       </ListItemButton>
//     </StyledTooltip>
//   </React.Fragment>
// );

// export default function makeDrawerMenus(menuChangeListener) {
//   changeListener = menuChangeListener;
//   return mainListItems;
// }