import React from 'react'
import { useContext } from 'react'
import { GloablContext } from '../context/global'

function NotCompletedTasks({ task }) {
    const { changeTaskStatus, deleteTask } = useContext(GloablContext)
    return (
        <div>
            <li>
                <input type="checkbox" checked={false} onChange={() => { if (window.confirm("are you sure you want to mark the task" + task.task + "as completed?, once you mark it you wont be able to unmark it")) changeTaskStatus(task.id) }} /> {task.task} <button onClick={() => { if (window.confirm("are you sure you want to delete this task?")) deleteTask(task.id) }} >x</button>
            </li>
        </div>
    )
}

export default NotCompletedTasks