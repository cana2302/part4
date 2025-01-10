const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verifies that ID property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  assert(blogs[0].id !== undefined)
  assert(blogs[0]._id === undefined)
})

after(async () => {
  await mongoose.connection.close()
})