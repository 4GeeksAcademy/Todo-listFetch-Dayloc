import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState();

  const createUser = async () => {
    await fetch(
      "https://playground.4geeks.com/todo/users/Yumar", //hace la peticion
      {
        method: "POST",
      }
    ).then((resp) => {
      if (resp.ok) {
        alert("Se ha creado el usuario con exito.");
        getUser();
      }
    });
  };

  const getUser = async () => {
    await fetch("https://playground.4geeks.com/todo/users/Yumar")
      .then((resp) => {
        if (!resp.ok) {
          createUser();
        }
        return resp.json();
      })
      .then((user) => setUser(user));
  };

  const deleteUser = async () => {
    await fetch("https://playground.4geeks.com/todo/users/Yumar", {
      method: "DELETE",
    }).then((resp) => resp.ok && setUser(null));
  };

  useEffect(() => {
    getUser();
  }, []);
  const createTask = async (task) => {
    await fetch("https://playground.4geeks.com/todo/todos/Yumar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: task,
        is_done: false,
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((respJson) => {
        const userTasks = user.todos;
        const newUser = {
          ...user,
          todos: [...userTasks, respJson],
        };
        setUser(newUser);
      });
  };

  const validateTask = (task) => {
    if (!task || !task.trim()) {
      alert("El Campo de tarea es obligatorio.");
    }
    createTask(task);
    setTask("");
  };

  const delateTask = async (task) => {
    const id = task.id;
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        const userTasks = user.todos.filter((item) => item.id !== task.id);
        const newUser = {
          ...user,
          todos: [...userTasks],
        };
        setUser(newUser);
      }
    });
  };

  return (
    <div className="container text-center">
      <h1>Lista de Tareas</h1>
      <div className="tolist">
        <input
          placeholder="Agregar Tarea"
          onChange={(evt) => setTask(evt.target.value)}
          onKeyDown={(evt) => evt.key === "Enter" && validateTask(task)}
          value={task}
          type="text"
        />
      </div>

      <div className="con3 mt-3">
        <ul>
          {user &&
            user.todos.map((item, index) => (
              <li className="list" key={item.id}>
                {index + 1} . {item.label}
                <button
                  className="btn-close text-danger bg-danger"
                  id="btn1"
                  onClick={() => delateTask(item)}
                ></button>
              </li>
            ))}
        </ul>
      </div>
      <p className="footer mt-3">
        {user && user.todos.length === 0 ? (
          "No tienes  tareas pendientes"
        ) : (
          <span className="pendientes">
            Tienes {user && user.todos.length} tareas pendientes.{" "}
          </span>
        )}
      </p>
      <button
        className="btn2 mb-2 "
        data-mdb-animation-start="onHover"
        onClick={() => deleteUser()}
      >
        DELETE_USER
      </button>
    </div>
  );
};

export default Home;
