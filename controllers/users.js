const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

// ---- GET ------
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url:1, id: 1 })
  response.json(users)
})

// ---- POST -----
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const checkUsername = await User.findOne({ username })

  if (!username || !password) {
    return response.status(400).json({ error: 'content missing' })
  } else if (username.length<3 || password.length<3) {
    return response.status(400).json({ error: ' must be at least 3 characters long' })
  } else if (checkUsername) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username, 
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter