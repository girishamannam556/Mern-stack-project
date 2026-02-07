const express = require('express')
const Task = require('../models/Task')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
router.use(authMiddleware)


router.post('/', async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'User not authenticated' })
  }

  const { title, description } = req.body

  const task = new Task({
    title,
    description,
    status: 'yet_to_start',
    userId: req.userId,
  })

  await task.save()
  res.status(201).json(task)
})


router.get('/', async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'User not authenticated' })
  }

  const tasks = await Task.find({
    userId: req.userId, 
  })

  res.json(tasks)
})


router.put('/:id', async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'User not authenticated' })
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { status: req.body.status },
    { new: true }
  )

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  res.json(task)
})


router.delete('/:id', async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'User not authenticated' })
  }

  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId,
  })

  if (!deleted) {
    return res.status(404).json({ message: 'Task not found' })
  }

  res.json({ message: 'Task deleted successfully' })
})

module.exports = router