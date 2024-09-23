// convert Map to Object
const mapToObj = (map) => {

    return Array.from(map).reduce((obj, [key, value])=>{
        obj[key] = value;
        return obj;
    }, {});
}

export default mapToObj;