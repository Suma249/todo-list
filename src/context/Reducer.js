

function Reducer(state, action) {
    console.log("in reducer function for the action: " + action.type + " with the payload: " + action.payload.task);
    switch (action.type) {
        case "ADD_TASK": {
            console.log("tasks in state before updating");
            console.log("here is an error");
            state.tasks.forEach(task => console.log("task: " + task));
            console.log("there is no error here with foreach");
            const updatedState = {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
            console.log("tasks in state after updating");
            console.log("here is an error");
            state.tasks.forEach(task => console.log("task: " + task.task));
            console.log("there is no error here with foreach");
            return updatedState;
        }
        case "CHANGE_TASK_STATUS": {
            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        status: task.status === 'completed' ? 'not completed' : 'completed'
                    }
                }
                return task;
            })
            return {
                ...state,
                tasks: updatedTasks
            }
        };

        case "DELETE_TASK": return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.payload)
        }
        // case "BULK_TASK_STATUS_CHANGE": {

        // }
        //     break
        case 'TOGGLE_SELECT': {

        }
            break
        default: return state;
    }
}

export default Reducer