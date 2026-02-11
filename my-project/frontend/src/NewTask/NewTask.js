import React, { useState } from 'react'
import './NewTask.css'

function NewTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

   const token = localStorage.getItem('token')

  const handleAddTask = async (e) => {
    e.preventDefault()

    if (title.trim() === '' || description.trim() === '') {
      setMessage('Please fill all fields')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (!res.ok) {
        setMessage('Failed to add task')
        return
      }

      setTitle('')
      setDescription('')
      setMessage('Task added successfully')
    } catch (error) {
      setMessage('Server error. Try again.')
    }
  }

  return (
    <div className="task-container">
      <form className="form-container" onSubmit={handleAddTask}>
        <h2>Add New Task</h2>

    
        {message && <p className="message">{message}</p>}

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setMessage('') 
          }}
        />

        <input
          placeholder="Enter task description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            setMessage('') 
          }}
        />

        <button className="button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  )
}

export default NewTask
