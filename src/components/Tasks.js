import React, { useContext, useState } from 'react'
import { GloablContext } from '../context/global'
import CompletedTasks from './CompletedTasks'
import NotCompletedTasks from './NotCompletedTasks'

export default function Tasks() {
    const { tasks } = useContext(GloablContext)
    const [selectAll, setSelectAll] = useState(false)
    //console.log(tasks)
    console.log("re rendering tasks component as there was change in parent's state")
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>
    const completedTasks = tasks.filter(task => task.status === 'completed')
    const notCompletedTasks = tasks.filter(task => task.status === 'not completed')
    return (

        < div >
            <p className='completedTasks' style={{ display: 'inline-block' }}>
                <input type='checkbox' checked={selectAll} />
                <h3 style={{ display: 'inline' }} >Completed Tasks</h3>
            </p>
            <ul>
                {
                    completedTasks.map(task => <CompletedTasks key={task.id} task={task} />)
                }
            </ul>
            <p className='pendingTasks'>Pending Tasks</p>
            <ul>
                {
                    notCompletedTasks.map(task => <NotCompletedTasks key={task.id} task={task} />)
                }
            </ul>
        </div >
    )
}
