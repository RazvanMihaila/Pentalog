import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ tasks, onDelete, onToggle, onUpdate }) {
  if (!tasks.length) return <p className="empty">You have no task. Add one!</p>

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  )
}
