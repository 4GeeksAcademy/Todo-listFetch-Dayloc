import React, { useState } from "react";

//create your first component
const Home = () => {
  const [task,setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  
 const validateTask = (task) => {
 if (!task || !task.trim()) {
     alert("El Campo de tarea es obligatorio.");
  }
    setTasks([...tasks, task]);
   
    setTask('');
 }
  
  const delateTask = (task) => {
    const newTasks = tasks.filter((item) => item !== task);
    setTasks([...newTasks]);
    };
  return (
    <div className="container text-center">
      <h1>Lista de Tareas</h1>
      <div className="tolist">
        <input placeholder="Agregar Tarea" 
        onChange={(evt) => setTask (evt.target.value)}
        onKeyDown={(evt) => evt.key ==='Enter' && validateTask (task)}  
        value={task}
        type="text" />

      </div >

      <div className="con3 mt-3">
      <ul >
          {
            tasks.map((item,index) => <li className="list"  key={index}>{index+1} .    {item} <button class="btn-close text-danger bg-danger"  onClick={()=> delateTask(item)}></button></li>)
          }     
      </ul>
      </div>
      <p className="footer mt-3">{tasks.length===0 ? 'No tienes  tareas pendientes' : <span className="pendientes">Tienes  {tasks.length} tareas pendientes. </span>}</p> 
     
    </div>
  );
};

export default Home;
