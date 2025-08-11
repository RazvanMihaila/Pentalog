import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch {}
  }, [tasks])

  const addTask = (text) => {
    const newTask = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    }
    setTasks(prev => [newTask, ...prev])
  }

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))
  const toggleComplete = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const updateTask = (id, newText) => setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))

  return (
    <div className="app">
      <div className="container">
        <h1>React To-Do List</h1>
        <TodoForm onAdd={addTask} />
        <TodoList tasks={tasks} onDelete={deleteTask} onToggle={toggleComplete} onUpdate={updateTask} />
      </div>
    </div>
  )
}
