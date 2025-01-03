const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// ---- GET ------
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

// ---- POST -----
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

// ----------
module.exports = blogsRouter