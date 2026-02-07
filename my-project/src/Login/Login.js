import React, { useState } from 'react'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    localStorage.setItem('token', data.token)
    navigate('/home')
  }

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="login-heading">Login</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="button" type="submit">Login</button>

        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  )
}

export default Login