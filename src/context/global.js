import React, { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer';

const initialState = {
    tasks: [
        {
            id: 1,
            status: "not completed",
            task: "learn Dynamic Programming",
            isSelected: false
        },
        {
            id: 2,
            status: "not completed",
            task: "learn Graph data structure",
            isSelected: false
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
    console.log("state data: " + state.tasks);
    console.log("dispacth function: " + dispatch);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
        console.log("local storage updated")
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
    const changeTaskStatus = (taskId) => {
        console.log("inside a changeinliststatus function");
        console.log("id of the task to change status is: " + taskId);
        dispatch({
            type: "CHANGE_TASK_STATUS",
            payload: taskId
        })
    }

    const bulkTaskStatusChange = (task) => {
        console.log("inside change bul task status function");
        console.log("task arry is:" + task);
        dispatch({
            type: "BULK_TASK_STATUS_CHANGE",
            payload: task
        })
    }
    return (
        <GloablContext.Provider value={{
            tasks: state.tasks,
            addTask,
            changeTaskStatus,
            deleteTask,
            bulkTaskStatusChange

        }}>

            {
                children
            }
        </GloablContext.Provider>
    )

}

export default GlobalProvider;  