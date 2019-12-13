const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if(body.username && body.password) {
      if(body.password.length > 2) {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    } else {
      response.status(400).send('Password too short')
    }
  } else {
    response.status(400).send('Username and password required')
  }

  } catch (exception) {
    next(exception)
  }
})
usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs',{url:1, title: 1,author: 1, likes: 1 })
    
    response.json(users)
  
})
usersRouter.delete('/:id', async (request, response) => {
  try {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
  } catch(exception) {
    console.log(exception)
  }
})

module.exports = usersRouter