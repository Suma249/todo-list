

function Reducer(state, action) {
    // console.log("in reducer function for the action: " + action.type + " with the payload: " + action.payload.task);
    switch (action.type) {
        case "ADD_TASK": {
            console.log("tasks in state before updating");
            console.log("here is an error");
            state.tasks.forEach(task => console.log("task: " + task));
            console.log("there is no error here with foreach");
            const updatedState = {
                ...state,
                tasks: [...state.tasks, { ...action.payload, isSelected: false }]
            }
            console.log("tasks in state after updating");
            console.log("here is an error");
            state.tasks.forEach(task => console.log("task: " + task.task));
            console.log("there is no error here with foreach");
            return updatedState;
        }
        case "CHANGE_TASK_STATUS": {
            console.log("inside change task status case tasks received, to add to completed list are below");
            action.taskIds.forEach(task => console.log("task id: " + task))
            console.log("before updating")
            const updatedTasks = state.tasks.map(task => {
                if (action.taskIds.includes(task.id)) {
                    console.log("task name: " + task.task + " task id: " + task.id + " task.status: " + task.status + "is selected: " + task.isSelected);
                    return {
                        ...task,
                        status: task.status === 'completed' ? 'not completed' : 'completed'
                    }
                }
                return task;
            })
            updatedTasks.forEach(task => {
                if (action.taskIds.includes(task.id))
                    console.log("task name: " + task.task + " task id: " + task.id + " task.status: " + task.status + "is selected: " + task.isSelected);
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
        case "TOGGLE_SELECTION": {
            console.log("in toggle selection case to toggle the isSelected property")
            console.log("tasks arary ins tate before toggling: ")
            state.tasks.forEach(task => console.log("name: " + task.task + " id: " + task.id + " status: " + task.status + " is it selected: " + task.isSelected))
            console.log("id's of tasks received to toggle the isSelected property")
            action.taskIds.forEach(id => {
                console.log(id);
            })
            const updatedTasks = state.tasks.map(task => {
                if (action.taskIds.includes(task.id)) {
                    return {
                        ...task,
                        isSelected: !task.isSelected, // Toggle based on the current state
                    };
                }
                return task
            })
            console.log("tasks array in state after toggling: ");
            const updatedState = {
                ...state,
                tasks: updatedTasks
            }
            updatedState.tasks.forEach(task => {
                console.log("name: " + task.task + " id: " + task.id + " status: " + task.status + " is it selected: " + task.isSelected);
            })
            return updatedState
        }
        default: return state;
    }
}

export default Reducer