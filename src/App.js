import { useEffect, useState } from 'react';
import './App.css';
import Tasks from './components/Tasks';


function App() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialState
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks))
  }, [allTasks])

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
    const newTask = {
      id: allTasks.length + 1,
      status: status ? 'completed' : 'not completed',
      task: task
    }
    //console.log("all tasks before updating: " + allTasks);
    setAllTasks([...allTasks, newTask]);
    // console.log("all after updating before updating: " + allTasks);
    setTask("");
    setStatus(false);
  }

  return (
    <div>
      <Tasks tasks={allTasks} />
      <form>
        <input type="text" name="task" value={task} onChange={(e) => onTaskChange(e)} />
        <input type="checkbox" name="completed" checked={status} onChange={(e) => onStatusChange(e)} />
        <button onClick={(e) => handleAdd(e)}>Add</button>
      </form>
    </div>
  )
}

export default App;
