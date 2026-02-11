const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 5000;

require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

app.use(cors())
app.use(express.json())


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)


app.listen(PORT, () => {
  console.log('Server running on port 5000')
})
