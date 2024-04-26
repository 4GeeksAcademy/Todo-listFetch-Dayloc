import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [task,setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [user,setUser] = useState([]);


  const createUser= async()=>{
	await fetch('https://playground.4geeks.com/todo/users/Dayloc',{
		method: 'POST'
	}).then(resp=>{
		if(resp.ok){
			alert('Se ha creado el usuario corecctamente')
			getUser();
		}
	})
  }
  useEffect(()=>{
	getUser();
	createUser();

  },[])
  const createTask = async()=>{
	await fetch('https://playground.4geeks.com/todo/todos/Dayloc',{
	method: 'POST',
	body: JSON.stringify({
		"label": task,
		"is_done": false
	  })
	}).then (resp=>{
		if(resp.ok){
			return resp.json()
		}
	}).then(respJson=>{
		const newUser={
			...user,
			todos:[...userTaks,respJson]}
	})
	
  }
  
  const getUser= async()=>{
	await fetch('https://playground.4geeks.com/todo/users/Dayloc').then(resp=>{
		if(!resp.ok){
			createUser()
		}
		return resp.json()
	}).then(user=>setUser(user))
  }

  
 const validateTask = (task) => {
 if (!task || !task.trim()) {
     alert("El Campo de tarea es obligatorio.");
  }
    createTask( task);
   
    setTask('');
 }
  
  const delateTask = (task) => {
    const newTasks = tasks.filter((item) => item !== task);
    setTasks([...newTasks]);
    };
	console.log(user)
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
            user.todos.map((item,index) => <li className="list"  key={index}>{index+1} .    {item} <button class="btn-close text-danger bg-danger"  onClick={()=> delateTask(item)}></button></li>)
          }     
      </ul>
      </div>
      <p className="footer mt-3">{tasks.length===0 ? 'No tienes  tareas pendientes' : <span className="pendientes">Tienes  {tasks.length} tareas pendientes. </span>}</p> 
     
    </div>
  );
};

export default Home;
