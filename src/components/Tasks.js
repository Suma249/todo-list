import React, { useContext } from 'react'
import { GloablContext } from '../context/global'
import Task from './Task'

export default function Tasks() {
    const { tasks } = useContext(GloablContext)
    //console.log(tasks)
    console.log("re rendering tasks component as there was change in parent's state")
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>

    return (

        < div >
            <ul>
                {
                    tasks.map(
                        task => <Task task={task} />
                    )

                }
            </ul>
        </div >
    )
}
