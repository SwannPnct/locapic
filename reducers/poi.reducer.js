export default function f(poiList = [], action) {
    if (action.type === "addCoord") {
        return [...poiList, action.obj]
    } else if(action.type === "addInfo") {
        const copy = [...poiList];
        copy[action.index].title = action.obj.title;
        copy[action.index].desc = action.obj.desc;
        return copy
    } else if(action.type === "deletePoi") {
        const copy = [...poiList];
        copy.splice(action.index,1);
        return copy
    } else if(action.type === "loadFull"){
        return action.array
    }
    else {
        return poiList
    }
}