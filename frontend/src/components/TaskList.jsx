import React, { useState, useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(API, { title, completed: false });
      setTasks([...tasks, res.data]);
      setTitle("");
      fetchTasks;
    } catch (err) {
      console.error(err);
    }
  };
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      fetchTasks;
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return <div style={{maxWidth:"400px",margin:"2rem auto",textAlign:"center"}}>
    <h1>ToDo List</h1>
    <input
      type="text"
      value={title}
      onChange={(e)=>{setTitle(e.target.value)}}
      placeholder="Add a new Task"/>
    <button onClick={addTask}>Add Task</button>
    <ul style={{listStyle:"none",padding:0}}>
        {tasks.map((task)=>(
            <li key={task._id} style={{marginTop:"1rem"}}>
                <span
                  onClick={()=>toggleTask(task._id)}
                  style={{textDecoration:task.completed?"line-through":"none",cursor:"pointer"}}>
                  {task.title}
                </span>
                <button onClick={()=>deleteTask(task._id)} style={{marginLeft:"1rem"}}>Delete</button>
            </li>
        ))}
    </ul>
  </div>;
};
export  default TaskList;
