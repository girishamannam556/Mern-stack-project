import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Employee Task App</h1>

      <div className="home-actions">
        <Link to="/add-task" className="home-button">Add New Task</Link>
        <Link to="/tasks" className="home-button secondary">Task Board</Link>
        <button onClick={logout} className="home-button">Logout</button>
      </div>
    </div>
  )
}

export default Home