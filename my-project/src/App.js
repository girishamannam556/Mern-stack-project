import Login from './Login/Login'
import Home from './Home/Home'
import NewTask from './NewTask/NewTask'
import TaskBoard from './TaskBoard/TaskBoard'
import Register from './Register/Register' 
import PrivateRoute from './PrivateRoute/PrivateRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />        
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add-task" element={<PrivateRoute><NewTask /></PrivateRoute>} />
        <Route path="/tasks" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App