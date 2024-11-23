import React, { createContext, useEffect, useReducer } from 'react'
import Reducer from './Reducer';

const initialState = {
    tasks: [
        {
            id: 1,
            status: "not completed",
            task: "learn Dynamic Programming"
        },
        {
            id: 2,
            status: "not completed",
            task: "learn Graph data structure"
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

    const addTodoList = (task) => {
        console.log("in addtodo list function, calling dispatch function");
        dispatch(
            {
                type: "ADD_TODO_LIST",
                payload: task
            }
        );

    }
    return (
        <GloablContext.Provider value={{
            tasks: state.tasks,
            addTodoList

        }}>
            console.log("re rendering child componnets as there is a change in state of the componnet");
            {

                children
            }
        </GloablContext.Provider>
    )

}

export default GlobalProvider;  