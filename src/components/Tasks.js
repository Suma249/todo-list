import React, { useContext, useState, useMemo, useEffect } from 'react'
import { GloablContext } from '../context/global'
import CompletedTasks from './CompletedTasks'
import NotCompletedTasks from './NotCompletedTasks'
import PendingTasks from './PendingTasks'
import Task from './Task'

export default function Tasks() {
    const { tasks, toggleSelection, changeTaskStatus } = useContext(GloablContext)
    const [selectAllPending, setSelectAllPending] = useState(false)

    const completedTasks = useMemo(() => {
        return tasks.filter((task) => task.status === "completed");
    }, [tasks]);

    const notCompletedTasks = useMemo(() => {
        return tasks.filter((task) => task.status === "not completed");
    }, [tasks]);

    useEffect(() => {
        const allSelected = notCompletedTasks.every(task => task.isSelected);
        setSelectAllPending(allSelected);
    }, [notCompletedTasks]);

    useEffect(() => {
        const allSelected = completedTasks.every(task => task.isSelected);
        setSelectAllCompleted(allSelected);
    }, [completedTasks]);

    const [selectAllCompleted, setSelectAllCompleted] = useState(false)
    //console.log(tasks)
    console.log("re rendering tasks component as there was change in parent's state")
    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>

    /* const handleTaskSelectionForPendingTasks = () => {
         if (notCompletedTasks === null || notCompletedTasks.length === 0)
             return;
         //console.log("handle task selection for pendind tasks is called")
         const newSelectAllPending = !selectAllPending
         setSelectAllPending(newSelectAllPending);
         // const taskIdsToToggle = notCompletedTasks.map((task) => task.id); // Use IDs
         const taskIdsToToggle = notCompletedTasks
             .filter((task) => task.isSelected !== newSelectAllPending)
             .map((task) => task.id);
 
         toggleSelection(taskIdsToToggle);
     }*/

    const handleTaskToggle = type => {
        if (type === "pendingTasks") {
            if (notCompletedTasks === null || notCompletedTasks.length === 0)
                return;
            //console.log("handle task selection for pendind tasks is called")
            const newSelectAllPending = !selectAllPending
            setSelectAllPending(newSelectAllPending);
            // const taskIdsToToggle = notCompletedTasks.map((task) => task.id); // Use IDs
            const taskIdsToToggle = notCompletedTasks
                .filter((task) => task.isSelected !== newSelectAllPending)
                .map((task) => task.id);

            toggleSelection(taskIdsToToggle);
        }
        else {
            if (completedTasks === null || completedTasks.length === 0)
                return;
            //console.log("handle task selection for pendind tasks is called")
            const newSelectAllCompleted = !selectAllCompleted
            setSelectAllCompleted(newSelectAllCompleted);
            // const taskIdsToToggle = notCompletedTasks.map((task) => task.id); // Use IDs
            const taskIdsToToggle = completedTasks
                .filter((task) => task.isSelected !== newSelectAllCompleted)
                .map((task) => task.id);
            toggleSelection(taskIdsToToggle);
        }
    }
    /*  const handleTaskSelectionForCompletedTasks = () => {
          if (completedTasks === null || completedTasks.length === 0)
              return;
          //console.log("handle task selection for pendind tasks is called")
          const newSelectAllCompleted = !selectAllCompleted
          setSelectAllCompleted(newSelectAllCompleted);
          // const taskIdsToToggle = notCompletedTasks.map((task) => task.id); // Use IDs
          const taskIdsToToggle = completedTasks
              .filter((task) => task.isSelected !== newSelectAllCompleted)
              .map((task) => task.id);
          toggleSelection(taskIdsToToggle);
      }*/

    const handleAddToCompletedList = () => {
        const tasksToBeMarkedAsCompleted = notCompletedTasks.filter(task => task.isSelected === true).map(task => task.id)
        console.log("tasks to be added to completed list are below");
        notCompletedTasks.forEach(task => console.log("task name: " + task.task + "task is selcted: " + task.isSelected))
        if (tasksToBeMarkedAsCompleted === null || tasksToBeMarkedAsCompleted.length === 0) {
            alert("please selct the tasks to be added to the completed list")
            return
        }
        changeTaskStatus(tasksToBeMarkedAsCompleted);
    }

    const handleAddToNotCompletedList = () => {
        const tasksToBeMarkedAsCompleted = completedTasks.filter(task => task.isSelected === true).map(task => task.id)
        console.log("tasks to be added to completed list are below");
        notCompletedTasks.forEach(task => console.log("task name: " + task.task + "task is selcted: " + task.isSelected))
        if (tasksToBeMarkedAsCompleted === null || tasksToBeMarkedAsCompleted.length === 0) {
            alert("please selct the tasks to be added to the completed list")
            return
        }
        changeTaskStatus(tasksToBeMarkedAsCompleted);
    }

    return (

        < div >
            <div className="completedTasks">
                <input
                    type="checkbox"
                    checked={selectAllCompleted}
                    onChange={() => handleTaskToggle("completedTasks")}
                />
                <h3 style={{ display: 'inline' }}>Completed Tasks</h3>
            </div>
            <ul>
                {
                    completedTasks.map(task => <Task key={task.id} task={task} />)
                }
            </ul>
            <button onClick={handleAddToNotCompletedList}>Add to Not Completed List</button>
            {/* <div className="pendingTasks">
                <input
                    type="checkbox"
                // checked={selectAllPending}
                //  onChange={handleTaskSelectionForPendingTasks}
                />
                <h3 style={{ display: 'inline' }}>Pending Tasks</h3>
            </div>
            <ul>
                {
                    notCompletedTasks.map(task => <NotCompletedTasks key={task.id} task={task} />)
                }
            </ul> */}
            <div className="testingForPendingTasks">
                <input
                    type="checkbox"
                    checked={selectAllPending}
                    onChange={() => handleTaskToggle("pendingTasks")}
                />
                <h3 style={{ display: 'inline' }}>Testing For Pending Tasks</h3>
            </div>
            <ul>
                {
                    notCompletedTasks.map(task => <PendingTasks key={task.id} task={task} />)
                }
            </ul>
            <button onClick={handleAddToCompletedList}>Add to Completed List</button>
        </div >
    )
}
