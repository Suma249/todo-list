import React, { useContext } from 'react'
import { GloablContext } from '../context/global'

export default function Tasks() {
    const { tasks } = useContext(GloablContext)
    //console.log(tasks);
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>
    return (
        <div>
            {
                tasks.map(
                    task => <li key={task.id}> <input type="checkbox" checked={task.status === 'completed'} /> {task.task} ....{task.status}</li>
                )

            }
        </div>
    )
}
