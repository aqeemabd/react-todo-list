import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
const { v4: uuidv4 } = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value

    if(name === '') return alert('Name is required')

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })

    todoNameRef.current.value = null
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text'/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => todo.complete).length} left to do</div>
    </>
  );
}

export default App;
