import React, { useContext, useState, useEffect } from 'react'
import { GloablContext } from '../context/global'
//import CompletedTasks from './CompletedTasks'
//import NotCompletedTasks from './NotCompletedTasks'
//import PendingTasks from './PendingTasks'
import Task from './Task'
import SearchBar from './SearchBar'
import SortBy from './SortBy'

export default function Tasks() {
    const { tasks, toggleSelection, changeTaskStatus } = useContext(GloablContext)

    const [selectAllPending, setSelectAllPending] = useState(false)
    const [selectAllCompleted, setSelectAllCompleted] = useState(false)

    const [searchTextCompletedTasks, setSearchTextCompletedTasks] = useState("")
    const [searchTextPendingTasks, setSearchTextPendingTasks] = useState("")

    const [sortByCompletedTasks, setSortByCompletedTasks] = useState("");
    const [sortByPendingTasks, setSortByPendingTasks] = useState("");

    const completedTasks = tasks.filter(task => task.status === 'completed');
    const notCompletedTasks = tasks.filter(task => task.status === 'not completed');
    const [filteredCompletedTasks, setFilteredCompletedTasks] = useState(completedTasks)
    const [filteredNotCompletedTasks, setFilteredNotCompletedTasks] = useState(notCompletedTasks)


    useEffect(() => {
        const allSelected = notCompletedTasks.every(task => task.isSelected);
        setSelectAllPending(allSelected);
    }, [notCompletedTasks]);

    useEffect(() => {
        const allSelected = completedTasks.every(task => task.isSelected);
        setSelectAllCompleted(allSelected);
    }, [completedTasks]);

    useEffect(() => {
        setFilteredCompletedTasks(
            completedTasks.filter(task =>
                task.task.toLowerCase().includes(searchTextCompletedTasks.toLowerCase())
            )
        );
    }, [searchTextCompletedTasks, completedTasks]);

    useEffect(() => {
        setFilteredNotCompletedTasks(
            notCompletedTasks.filter(task =>
                task.task.toLowerCase().includes(searchTextPendingTasks.toLowerCase())
            )
        );
    }, [searchTextPendingTasks, notCompletedTasks]);

    if (tasks === null || tasks.length === 0)
        return <div>No tasks Available</div>

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
        // console.log("tasks to be added to completed list are below");
        // notCompletedTasks.forEach(task => console.log("task name: " + task.task + "task is selcted: " + task.isSelected))
        if (tasksToBeMarkedAsCompleted === null || tasksToBeMarkedAsCompleted.length === 0) {
            alert("please selct the tasks to be added to the completed list")
            return
        }
        changeTaskStatus(tasksToBeMarkedAsCompleted);
    }

    const handleAddToNotCompletedList = () => {
        const tasksToBeMarkedAsCompleted = completedTasks.filter(task => task.isSelected === true).map(task => task.id)
        // console.log("tasks to be added to completed list are below");
        //notCompletedTasks.forEach(task => console.log("task name: " + task.task + "task is selcted: " + task.isSelected))
        if (tasksToBeMarkedAsCompleted === null || tasksToBeMarkedAsCompleted.length === 0) {
            alert("please selct the tasks to be added to the completed list")
            return
        }
        changeTaskStatus(tasksToBeMarkedAsCompleted);
    }


    return (

        < div >
            <>
                <span>
                    <SearchBar SearchText={(text) => setSearchTextCompletedTasks(text)} />
                    <SortBy sortBy={sortByCompletedTasks} setSortBy={setSortByCompletedTasks} />
                </span>
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
                        filteredCompletedTasks.map(task => <Task key={task.id} task={task} />)
                    }
                </ul>
                <button onClick={handleAddToNotCompletedList}>Add to Not Completed List</button>
            </>
            <>
                <span>
                    <SearchBar SearchText={(text) => setSearchTextPendingTasks(text)} />
                    <SortBy sortBy={sortByPendingTasks} setSortBy={setSortByPendingTasks} />
                </span>
                <div className="pendingTasks">
                    <input
                        type="checkbox"
                        checked={selectAllPending}
                        onChange={() => handleTaskToggle("pendingTasks")}
                    />
                    <h3 style={{ display: 'inline' }}>Pending Tasks</h3>
                </div>
                <ul>
                    {
                        filteredNotCompletedTasks.map(task => <Task key={task.id} task={task} />)
                    }
                </ul>
                <button onClick={handleAddToCompletedList}>Add to Completed List</button>
            </>
        </div>

    )
}
