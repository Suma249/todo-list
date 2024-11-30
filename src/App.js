//import { useEffect, useState } from 'react';
import './App.css';
import Tasks from './components/Tasks';
import GlobalProvider from './context/global';
import AddNewTask from './components/AddNewTask';
import Header from './components/Header';


function App() {
  // const [allTasks, setAllTasks] = useState(() => {
  //   const savedTasks = localStorage.getItem('tasks');
  //   return savedTasks ? JSON.parse(savedTasks) : initialState
  // })

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(allTasks))
  // }, [allTasks])


  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <GlobalProvider>
          <Tasks />
          <AddNewTask />
        </GlobalProvider>
      </div>
    </div>
  )
}

export default App;
