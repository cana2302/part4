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

test('verify POST new blog', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length+1)

  const authors = blogAtEnd.map(n => n.author)
  assert(authors.includes('Test Author'))
})

test('verify that if the likes property is missing from the request, it will default to the value 0', async() => {
  const newBlog = {
    title: 'Test likes Blog',
    author: 'Test likes Author',
    url: 'https://test.likes.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  const lastblog = blogAtEnd.length-1
  
  assert.strictEqual(blogAtEnd[lastblog].likes, 0)
})

test('verify that if the title or url properties are missing', async() => {
  const newBlog = {
    author: 'Test title missing Author',
    url: 'https://test.title.missing.com',
    likes: 15,
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

  const newBlog1 = {
    title: 'Test url missing Blog',
    author: 'Test url missing Author',
    likes: 20,
  }

  await api
  .post('/api/blogs')
  .send(newBlog1)
  .expect(400)
})

test('succeeds with status code 204 if id is valid', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('verify if blog/id modify likes property succeds', async() => {
  const updateBlog = {
    title: 'Test update likes',
    author: 'Test Author',
    url: 'https://test.update.likes.com',
    likes: 9999999,
  }

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  
  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send(updateBlog)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[0].likes, updateBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})