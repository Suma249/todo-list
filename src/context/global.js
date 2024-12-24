import React, { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer';

const initialState = {
    tasks: [
        {
            id: 1,
            status: "not completed",
            task: "learn Dynamic Programming",
            isSelected: false,
            dateAdded: "2024-11-30"
        },
        {
            id: 2,
            status: "not completed",
            task: "learn Graph data structure",
            isSelected: false,
            dateAdded: "2024-12-02"
        }
    ]
};

function getInitialState() {
    const savedTasks = localStorage.getItem("tasks");
    try {
        const tasks = savedTasks ? JSON.parse(savedTasks) : initialState.tasks
        return { tasks };
    }
    catch (error) {
        console.log("error parsing data: " + error);
        return initialState
    }
}

export const GloablContext = createContext();

function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState, getInitialState);
    //console.log("initialsing the state, below is the state data: ");
    /*state.tasks.forEach(task => {
        console.log("name: " + task.task + " id: " + task.id + " status: " + task.status + " is it selected: " + task.isSelected);
    })*/
    //  console.log("dispacth function: " + dispatch);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
        //console.log("local storage updated ")
        //state.tasks.forEach(task => console.log("task name: " + task.task + " is selected: " + task.isSelected));
    }, [state.tasks])

    /* useEffect(() => {
         return () => {
             console.log("clearing local storage for tasks key");
             localStorage.removeItem("tasks");
         }
     }, [])*/

    const addTask = (task) => {
        console.log("in addtodo list function, calling dispatch function");
        dispatch(
            {
                type: "ADD_TASK",
                payload: task
            }
        );

    }
    function deleteTask(taskId) {
        console.log("in deleteTask function with task id: " + taskId);
        dispatch(
            {
                type: "DELETE_TASK",
                payload: taskId
            }
        )
    }
    const changeTaskStatus = (taskIds) => {
        console.log("inside a change task status function");
        console.log("tasks received, to add to completed list are below");
        taskIds.forEach(task => console.log("task id: " + task))
        dispatch({
            type: "CHANGE_TASK_STATUS",
            taskIds: taskIds
        })
    }
    const toggleSelection = (taskIds) => {
        //console.log("toggle selction function is called for toggling of isSelected property for below tasks");
        //tasks.forEach(task => console.log(task.task + " " + task.status + " " + task.isSelected));
        dispatch({
            type: "TOGGLE_SELECTION",
            taskIds: taskIds
        })
    }
    return (
        <GloablContext.Provider value={{
            tasks: state.tasks,
            addTask,
            changeTaskStatus,
            deleteTask,
            toggleSelection
        }}>

            {
                children
            }
        </GloablContext.Provider>
    )

}

export default GlobalProvider;  