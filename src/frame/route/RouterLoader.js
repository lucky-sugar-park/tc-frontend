// const fs = require('fs');
// const path = require('path');
// const util = require('util');
// const esprima = require('esprima');

// const traverse = function(dir, result=[]) {

//     // list files in directory and loop through
//     fs.readdirSync(dir).forEach((file)=>{
//         // builds full path of file
//         const fPath = path.resolve(dir, file);

//         // prepare stats obj
//         const fileStats = { file, path: fPath};

//         // is the file a directory ?
//         // if yes, traverse it also, if no just add it to the result
//         if(fs.statSync(fPath).isDirectory()) {
//             fileStats.type = 'dir';
//             fileStats.files= [];
//             result.push(fileStats);
//             return traverse(fPath, fileStats.files);
//         }

//         fileStats.type = 'file';
//         if(fileStats.file.name!=="RouterLoader.js") {
//             const ext=fileStats.file.name.slice(fileStats.file.name.lastIndexOf("."));
//             if(ext==="js" || ext==="jsx") {
//                 result.push(fileStats);
//             }
//         }
//     });

//     return result;
// }

import { configureRoute } from '../../components/views';

const loadRoutes = (props) => {
    // const routeConfigs = [];

    // const files = util.inspect(traverse("../../", false, null));
    // files.forEach(file=>{
    //     let functionArg = esprima.parseScript(file);
    //     functionArg.body.forEach(el=>{
    //         let variableDeclarator = el.declarations[0];
    //         let params = [];
    //         variableDeclarator.init.params.forEach(arg => {
    //             params.push(arg.name)
    //         });
    
    //         if(variableDeclarator.id.name==="configureRoutes") {
    //             eval("configureRoutes")(props);
    //         }
    //     })
    // });
    // return routeConfigs;
    return configureRoute(props);
}

export {
    loadRoutes
}

