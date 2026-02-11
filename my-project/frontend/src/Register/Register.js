import React, { useState } from 'react'
import './Register.css'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('') 
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')


    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

     
      setSuccess('Account created successfully. Redirecting to login...')

      
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      setError('Server error. Please try again.')
    }
  }

  return (
    <div className="page-center">
      <form className="form-container" onSubmit={handleRegister}>
        <h1 className="login-heading">Register</h1>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <input
          type="email"
          placeholder="Enter email"
          className="input-value"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="input-value"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" type="submit">
          Register
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register