import React, { useContext } from 'react'
import { GloablContext } from '../context/global'

function Task({ task }) {
    const { changeTaskStatus, deleteTask } = useContext(GloablContext)
    return (
        <div>
            <li key={task.id}>
                <input type="checkbox" checked={task.status === 'completed'} onChange={() => changeTaskStatus(task.id)} /> {task.task} {task.status} <button onClick={() => deleteTask(task.id)} >x</button>
            </li>
        </div>
    )
}

export default Task