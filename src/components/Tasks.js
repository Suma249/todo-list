import React, { useContext, useState } from 'react'
import { GloablContext } from '../context/global'
import CompletedTasks from './CompletedTasks'
import NotCompletedTasks from './NotCompletedTasks'

export default function Tasks() {
    const { tasks } = useContext(GloablContext)
    const [selectAllPending, setSelectAllPending] = useState(false)
    // const { bulkTaskStatusChange } = useContext(GloablContext);
    // const [selectAllCompleted, setSelectAllCompleted]=useState(false)
    //console.log(tasks)
    console.log("re rendering tasks component as there was change in parent's state")
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>
    const completedTasks = tasks.filter(task => task.status === 'completed')
    const notCompletedTasks = tasks.filter(task => task.status === 'not completed')

    const handleTaskSelectionForPendingTasks = () => {
        setSelectAllPending(prevSelectAll => {
            const newSelectAllForPending = !prevSelectAll
            notCompletedTasks.forEach(task => {

            })
        }
        );
    }
    return (

        < div >
            <p className='pendingTasks'>Completed Tasks</p>
            <ul>
                {
                    completedTasks.map(task => <CompletedTasks key={task.id} task={task} />)
                }
            </ul>
            <div className="pendingTasks">
                <input
                    type="checkbox"
                    checked={selectAllPending}
                    onChange={handleTaskSelectionForPendingTasks}
                />
                <h3 style={{ display: 'inline' }}>Pending Tasks</h3>
            </div>
            <ul>
                {
                    notCompletedTasks.map(task => <NotCompletedTasks key={task.id} task={task} />)
                }
            </ul>
        </div >
    )
}
