

function Reducer(state, action) {
    console.log("in reducer function for the action: " + action.type + " with the payload: " + action.payload);
    switch (action.type) {
        case "ADD_TODO_LIST":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case "MARK_LIST": return state;
        case "REMOVE_LIST": return state;
        default: return state;
    }
}

export default Reducer