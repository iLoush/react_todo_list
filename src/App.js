import React, { useState, useRef, useEffect } from 'react';
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  // to get todos from localStorage 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // store todos in localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // to check completed todos
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // to add todo to pur todo list
  function addTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = ''
  }

  // to clear completed todos
  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input
        type="text"
        ref={todoNameRef}
      />
      <button onClick={addTodo}>Add todo</button>
      <button onClick={clearTodos}>Clear completed todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;