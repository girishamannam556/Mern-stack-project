import React, { useEffect, useState } from 'react'
import './TaskBoard.css'

function TaskBoard() {
  const [tasks, setTasks] = useState([])
  const [activeStatus, setActiveStatus] = useState('all')

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks', error)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      fetchTasks()
    } catch (error) {
      console.error('Error updating status', error)
    }
  }

  const deleteTask = async id => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        alert('Delete failed')
        return
      }

      fetchTasks()
    } catch (error) {
      console.error('Error deleting task', error)
    }
  }

  const visibleTasks =
    activeStatus === 'all'
      ? tasks
      : tasks.filter(task => task.status === activeStatus)

  return (
    <div className="taskboard-page">
  
      <div className="sidebar">
        <h2 className="sidebar-title">Task Board</h2>

        <ul className="status-list">
          {['all', 'yet_to_start', 'pending', 'completed'].map(status => (
            <li
              key={status}
              className={activeStatus === status ? 'active' : ''}
              onClick={() => setActiveStatus(status)}
            >
              {status.replaceAll('_', ' ').toUpperCase()}
            </li>
          ))}
        </ul>
      </div>


      <div className="content">
        {visibleTasks.length === 0 ? (
          <p className="empty-text">No tasks available</p>
        ) : (
          visibleTasks.map(task => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>

              {activeStatus !== 'all' && (
                <p className="task-desc">{task.description}</p>
              )}

              <div className="task-footer">
                <span className="status-label">
                  Status: {task.status.replaceAll('_', ' ')}
                </span>

                <div className="action-buttons">
                  {activeStatus === 'all' && (
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={e =>
                        updateStatus(task._id, e.target.value)
                      }
                    >
                      <option value="yet_to_start">Yet To Start</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskBoard
