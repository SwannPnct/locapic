export default function f(poiList = [], action) {
    if (action.type === "saveList") {
        return action.list
    } else {
        return poiList
    }
}