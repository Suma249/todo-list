import React from 'react'

export default function Tasks(props) {
    const tasks = props.tasks
    //console.log(tasks);
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
