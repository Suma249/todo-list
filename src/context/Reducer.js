

function Reducer(state, action) {
    console.log("in reducer function for the action: " + action.type + " with the payload: " + action.payload.task);
    switch (action.type) {
        case "ADD_TODO_LIST": {
            console.log("tasks in state before updating");
            state.tasks.array.forEach(task => console.log("task: " + task.task));
            const updatedState = {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
            console.log("tasks in state after updating");
            state.tasks.array.forEach(task => console.log("task: " + task.task));
            return updatedState;
        }
        case "MARK_LIST": return state;
        case "REMOVE_LIST": return state;
        default: return state;
    }
}

export default Reducer