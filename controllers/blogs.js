const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// ---- GET ------
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// ---- POST -----
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const saveBlog = await blog.save()
  response.status(201).json(saveBlog)
})

// ----------
module.exports = blogsRouter