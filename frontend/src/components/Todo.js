import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, deleteTodo, fetchTodo } from "../reducers/todoReducer";
const Todo = () => {
  const [todo, setTodo] = useState("");

  const todos = useSelector((state) => {
    // console.log(state.todos,"<----State");
    return state.todos;
  });
  //   console.log(todos,"todos page");

  const dispatch = useDispatch();

  const addTodo = () => {
    dispatch(createTodo({ todo: todo }));
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  return (
    <div>
      <input
        placeholder="Write Todo Here"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="btn" onClick={() => addTodo()}>
        ADD TODO
      </button>

      <ul className="collection">
        {todos?.map((item) => {
          return (
            <li className="collection-item" key={item._id}
            onClick={()=>dispatch(deleteTodo(item._id))}
            
            >
              {item.todo}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
