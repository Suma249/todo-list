import React, { useContext } from 'react'
import { GloablContext } from '../context/global'
import CompletedTasks from './CompletedTasks'
import NotCompletedTasks from './NotCompletedTasks'

export default function Tasks() {
    const { tasks } = useContext(GloablContext)
    //console.log(tasks)
    console.log("re rendering tasks component as there was change in parent's state")
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>
    const completedTasks = tasks.filter(task => task.status === 'completed')
    const notCompletedTasks = tasks.filter(task => task.status === 'not completed')
    return (

        < div >
            <p className='completedTasks'>Completed Tasks</p>
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
