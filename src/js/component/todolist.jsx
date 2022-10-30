import React, { useState, useEffect } from "react";

export const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos()
  }, []);
const getTodos = async () => {
  fetch("https://assets.breatheco.de/apis/fake/todos/user/danieljesusgonz", {
    method: "GET",
  })
    .then((resp) => {
      if (resp.status == 404) {
      createUser()
      }
      return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then((data) => {
      //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      setTodos(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch((error) => {
      //manejo de errores
      console.log(error);
    });
}
  const handlertKeyPress = (evento) => {
    if (evento.key == "Enter") {
      fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/danieljesusgonz",
        {
          method: "PUT",
          body: JSON.stringify([...todos, {label:input,done:false}]),
      headers: {
        "Content-Type": "application/json"
        }}
      )
        .then((resp) => {
          return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          setTodos([...todos, {label:input,done:false}]); //esto imprimirá en la consola el objeto exacto recibido del servidor
          setInput("");
        })
        .catch((error) => {
          //manejo de errores
          console.log(error);
        });

  
    }
  };
let deleteTask = async (position) =>{
  let newTask = todos.filter((element, id) => {
    return id !== position;
  })
  if(newTask.length == 0){
  console.log(newTask.length)  
  fetch(
    "https://assets.breatheco.de/apis/fake/todos/user/danieljesusgonz",
    {
      method: "DELETE",
      body: JSON.stringify([...todos, {label:input,done:false}]),
  headers: {
    "Content-Type": "application/json"
    }}
    
  ) .then((resp)=>{
createUser()
console.log(resp.status)
  })
  } else {
    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/danieljesusgonz",
      {
        method: "PUT",
        body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json"
      }}
    )
    .then((resp) => {
      getTodos()
      console.log(resp.status)
      console.log(resp.json()); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then((data) => {
      //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
    //getTodos()xxx
    //console.log(data)
    })
    .catch((error) => {
      //manejo de errores
      console.log(error);
    });
  } 
}
const createUser = async() => {
  fetch(
    "https://assets.breatheco.de/apis/fake/todos/user/danieljesusgonz",
    {
      method: "POST",
      body: JSON.stringify([]),
  headers: {
    "Content-Type": "application/json"
    }}
  )
  .then((resp) => {
    getTodos()
    console.log(resp.status)
    console.log(resp.json()); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
  })
}
  return (
    <div className=" ">
      <h1 className="title display-1 mt-5 mb-2">todos</h1>
      <div className="form shadow mb-5 bg-body rounded">
        <div className="list">
          <input
            className="input"
            value={input}
            placeholder="What need's to be done"
            onKeyDown={handlertKeyPress}
            onChange={(event) => setInput(event.target.value)}
          ></input>
        </div>

        {/* {todos.length == 0 && ""} */}
        {todos && todos.map((task, index) => (
          <li key={index} className="todolist d-flex justify-content-between  ">
            {task.label}
            <button
              className="button d-flex"
              type="button"
              onClick={(event) =>
                deleteTask(index)
              }
            >
              {" "}
              <i className="fa-solid fa-circle-minus"></i>
            </button>
          </li>
        ))}
        {
          <span className="taskleft d-flex ">
            {" "}
            {todos.length === 0
              ? "no task"
              : todos.length + " task pending "}{" "}
          </span>
        }
      </div>
    </div>
  );
};



