import React, { useState } from "react";

export const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const handlertKeyPress = (evento) => {
    if (evento.key == "Enter") {
      setTodos([...todos, input]);
      setInput("");
    }
  };
  return (
    <div className=" ">
      <h1 className="title display-1 mt-5 mb-2">todos</h1>
      <div className="form shadow mb-5 bg-body rounded">
        <card className="list">
          <input
            className="input"
            value={input}
            placeholder="What need's to be done"
            onKeyDown={handlertKeyPress}
            onChange={(event) => setInput(event.target.value)}
          ></input>
        </card>

        {todos.length == 0 && ""}
        {todos.map((task, index) => (
          <li key={index} className="todolist d-flex justify-content-between  ">
            {task}
            <button
              className="button d-flex"
              type="button"
              onClick={(event) =>
                setTodos(
                  todos.filter((element, id) => {
                    return index !== id;
                  })
                )
              }
            >
              {" "}
              <i class="fa-solid fa-circle-minus"></i>
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
