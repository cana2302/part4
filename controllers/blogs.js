const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

// ---- GET ------
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1 }) //promesa
  response.json(blogs)
})

// ---- POST -----
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.find({})

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user[0].id
    }
  )
  
  if (!blog.title) {
    response.status(400).end()
  } else if(!blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()

    if (!user[0].blogs) {
      user[0].blogs = [];  // Inicializa el array si no existe
    }
    user[0].blogs = user[0].blogs.concat(savedBlog._id)
    await user[0].save()

    response.status(201).json(savedBlog)
  }

})

// ---- DELETE ID ----
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// --- UPDATE LIKES ----
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(blog)
})

// ----------
module.exports = blogsRouter