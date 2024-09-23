// import React from 'react';

// import {
//     Checkbox,
//     IconButton,
//     TableCell,
//     TableRow,
//     TextField,
//     Tooltip,
//     Typography
// } from '@mui/material';
// import DoneIcon from '@mui/icons-material/Done';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// const InterfsHeaderPropListTableRow = (props) => {

//     const [checked, setChecked] = React.useState(false);
//     const [header, setHeader] = React.useState(props.header);

//     React.useEffect(() =>{
//         setHeader(props.header);
//     },[props.header]);

//     const handleDelete = (seq) => {

//     }

//     const handleUpdate = () => {

//     }

//     return (
//         <TableRow>
//             <TableCell type="small" padding='checkbox'>
//                 <Checkbox 
//                     checked={ checked }
//                     onClick={ ()=>props.editMode?setChecked(!checked):"" }
//                 />
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.name }
//                     sx={{ width: '20ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, name: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.name }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.order }
//                     sx={{ width: '5ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, order: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.order }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.type }
//                     sx={{ width: '10ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, type: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.type }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.length }
//                     sx={{ width: '5ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, length: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.length }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.value }
//                     sx={{ width: '10ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, value: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.value }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell>
//                 {
//                 props.editMode ?
//                 <TextField
//                     size="small"
//                     value={ header.description }
//                     sx={{ width: '10ch' }}
//                     InputProps={{ disableUnderline: true }}
//                     variant="standard"
//                     onChange={ e=>setHeader({ ...header, description: e.target.value }) }
//                 />
//                 :
//                 <Typography>
//                     { header.description }
//                 </Typography>
//                 }
//             </TableCell>
//             <TableCell align="center">
//                 <Tooltip title="삭제">
//                     <IconButton 
//                         disabled={ props.editMode ? false : true }
//                         onClick={ ()=>handleDelete(props.seq) }
//                     >
//                         <RemoveCircleIcon/>
//                     </IconButton>
//                 </Tooltip>
//                 <Tooltip title="수정적용">
//                     <IconButton 
//                         disabled={ checked && props.editMode ? false : true }
//                         onClick={ handleUpdate }
//                     >
//                         <DoneIcon/>
//                     </IconButton>
//                 </Tooltip>
//             </TableCell>
//         </TableRow>
//     )
// }

// export default InterfsHeaderPropListTableRow;