import React, { createContext, useReducer } from 'react'

const initialState = [
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
];

function getInitialState() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : initialState;
}

export const GloablContext = createContext();

function GlobalProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initialState, getInitialState);
    return (
        <GloablContext.Provider value={{}}>
            {
                children
            }
        </GloablContext.Provider>
    )

}

export default GlobalProvider;  