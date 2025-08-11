import React, { useState, useEffect } from 'react'

export default function TodoItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(task.text)
  const [removing, setRemoving] = useState(false)

  useEffect(() => {
    setText(task.text)
  }, [task.text])

  const save = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onUpdate(task.id, trimmed)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setRemoving(true)
    setTimeout(() => onDelete(task.id), 300) // așteaptă animatia
  }

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''} ${removing ? 'removing' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <form onSubmit={save} className="edit-form">
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => { setIsEditing(false); setText(task.text) }}>Cancel</button>
        </form>
      ) : (
        <>
          <span className="text">{task.text}</span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Șterge</button>
          </div>
        </>
      )}
    </li>
  )
}
