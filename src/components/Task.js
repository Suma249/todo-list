import React from 'react'
import { useContext } from 'react'
import { GloablContext } from '../context/global'



function Task({ task }) {
    const { deleteTask, toggleSelection } = useContext(GloablContext)
    const handleToggle = () => {
        console.log("inside the handletoggle function for the task");
        const taskIdArray = [task.id];
        taskIdArray.forEach(task => console.log(task))
        toggleSelection(taskIdArray);
    }
    return (
        <div>
            <li>
                <input
                    type="checkbox"
                    checked={task.isSelected}
                    onChange={
                        handleToggle
                        /* () => {
                             if (window.confirm("mark this task as completed?"))
                                 changeTaskStatus(task.id)
                         }*/
                    }
                />
                <span>
                    <strong>Task:</strong> {task.task} <br />
                    <strong>Date Added:</strong> {task.dateAdded} <br />
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this task?")) deleteTask(task.id);
                        }}
                    >
                        x
                    </button>
                </span>

            </li>
        </div>
    )
}

export default Task