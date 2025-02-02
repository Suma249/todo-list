import React, { useContext } from 'react'
import { useState } from 'react';
import { GloablContext } from '../context/global';

function AddNewTask() {
    const [task, setTask] = useState("");
    const [status, setStatus] = useState(false);
    const [description, setDescription] = useState("");
    const { addTask } = useContext(GloablContext);

    const onTaskChange = (event) => {
        setTask(event.target.value);
    }

    const onStatusChange = (event) => {
        if (event.target.checked)
            setStatus(true);
        else
            setStatus(false);
    }

    const handleAdd = (event) => {
        event.preventDefault();
        if (task === null || task === "") {
            window.alert("task is empty, can not add to list");
            return;
        }
        const newTask = {
            id: Math.floor(Math.random() * 100000),
            status: status ? 'completed' : 'not completed',
            task,
            isSelected: false,
            description
        }
        console.log("task to be added is:\n id:  " + newTask.id + "\n status: " + newTask.status + "\n task: " + newTask.task);
        //console.log("all tasks before updating: " + allTasks);
        console.log("call to addtodolist function shared via context");
        if (newTask !== null && newTask.length !== 0)
            addTask(newTask);
        console.log("call to addtodolist is over");
        // console.log("all after updating before updating: " + allTasks);
        setTask("");
        setStatus(false);
    }
    return (
        <div>
            <h4>Add New Task</h4>
            <div>
                <form>
                    <p>
                        <label>Task Name: </label>
                        <input type="text" name="task" value={task} onChange={(e) => onTaskChange(e)} />
                    </p>
                    <p>
                        <label>Is Task Completed?</label>
                        <input type="checkbox" name="completed" checked={status} onChange={(e) => onStatusChange(e)} />
                    </p>
                    <p>
                        <p>Please add a short description for task</p>
                        <input type="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
                    </p>
                    <button onClick={(e) => handleAdd(e)}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNewTask