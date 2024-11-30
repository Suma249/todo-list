import React, { useContext } from 'react'
import { GloablContext } from '../context/global'

function CompletedTasks({ task }) {
    const { deleteTask } = useContext(GloablContext);
    return (
        <div>
            <li>
                <input type="checkbox" checked={true} readOnly /> {task.task} <button onClick={() => { if (window.confirm("are you sure you want to delete this task?")) deleteTask(task.id) }} >x</button>
            </li>
        </div>
    )
}

export default CompletedTasks