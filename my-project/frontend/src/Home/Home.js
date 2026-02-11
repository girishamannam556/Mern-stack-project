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
      <button onClick={logout} className="logout-btn">
        Logout
      </button>

      <div className="home-card">
        <div className="home-content">
         
          <div className="home-text">
            <h1 className="home-title">Employee Task App</h1>
            <p className="home-subtitle">
              A simple and clean way to manage employee tasks, track progress,
              and stay organized every day.
            </p>
          </div>

        
          <div className="home-actions">
            <Link to="/add-task" className="action-button add">
               Add Task
            </Link>

            <Link to="/tasks" className="action-button board">
               Task Board
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
