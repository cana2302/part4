const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

test('verify POST new user', async () => {
  const newUser = {
    username: 'testNewUser',
    name: 'Test New User',
    password: 'test_test',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length+1)

  const names = userAtEnd.map(n => n.name)
  assert(names.includes('Test New User'))
})


test('verify not POST existing username', async () => {
  const newUser = {
    username: 'mluukkai',
    name: 'Test New User',
    password: 'test_test',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
  
  assert.strictEqual(response.status, 400);
  assert.strictEqual(response.body.error, 'username must be unique');
})


after(async () => {
  await mongoose.connection.close()
})