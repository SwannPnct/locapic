export default function f(pseudo = "", action) {
    if (action.type === "savePseudo") {
        return action.pseudo
    } else {
        return pseudo
    }
}