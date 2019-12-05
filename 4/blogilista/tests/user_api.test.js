const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('Creating a user', () => {
    beforeEach(async () => {
      await User.deleteMany({})
    })
describe('with invalid data', () => {
    test('fails when password is too short', async () => {
        const newUser = {
            username: "user1",
            name: "bla blaa",
            password: "1"
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400, "Password too short")
      })
      test('fails when username or password are missing', async () => {
        const newUser = {
            username: "user1",
            name: "bla blaa"
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400, "Username and password required")

      })
  
      
  })
})
  
  afterAll(() => {
    mongoose.connection.close()
  })