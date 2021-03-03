
import './App.css';
import Header from "./component/Header";
import { useState, useEffect } from "react";
import Tasks from './component/Tasks';
import AddTask from './component/AddTask';

const App = () => {
const [showAddTask, setShowAddTask] = useState(false)

const [tasks, setTasks] = useState([])
//digunakan untuk menangani hubungan antara fungsi dan fetch api
useEffect(()=>{
  const getTask = async () =>{
    const taskFromServer = await fetchTask()
    setTasks(taskFromServer)
  }

  getTask()
}, [])

//fetching data yang tersedia dari api
const fetchTask = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  console.log(data)
  return data
}

//menambahkan data menggunakan api
const addTask = async (task) =>{
  console.log(task)
  const response = await fetch('http://localhost:5000/tasks',
  {
    method:'POST',
    headers: {
      'Content-type' : 'application/json',
    },
    body: JSON.stringify(task)
  })
  const data = await response.json()
  setTasks([...tasks, data])
  // const id = Math.floor(Math.random()*10000)+1

  // const newTask = {id,...task}

  // setTasks([...tasks, newTask])
}

//menghapus data menggunakan api
const deleteTask = async (id) =>{
console.log(tasks.id)
const response = await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
    //We should control the response status to decide if we will change the state or not.
response.status === 200
 ? setTasks(tasks.filter((task)=> task.id !== id)) 
 : alert('Error Deleting This Task!')
}

//mengambil id dari masing masing task untuk nantinya digunakan pada toggle
const fetchSingleTask = async (id) => {
  const response = await fetch( `http://localhost:5000/tasks/${id}`)
  const data = await response.json()
  return data
}
//mengubah aktif dan tidak aktif berdasarkan id dari masing masing task melalui api
const toggleTask = async (id) => {
  const taskToToggle = await fetchSingleTask(id)
  const updateToggle = {...taskToToggle, reminder: !taskToToggle.reminder}

  const response = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(updateToggle)  
  })

  const data = await response.json()

  console.log(id)
  setTasks(tasks.map((task)=> task.id === id ? {...task, reminder:data.reminder}:task))
}

const hide = () => {
  console.log(showAddTask)
  setShowAddTask(!showAddTask)
}


  return (
    <div className="container">
    <Header
    onShowAdd = {hide} switchColor = {showAddTask} />
    {showAddTask && <AddTask onAddTask={addTask}/>}
    {tasks.length > 0 ? (<Tasks tasks = {tasks}  onDelete={deleteTask} onToggle={toggleTask} />)
     : ('No Task')}
    </div>
  )

}

export default App;
