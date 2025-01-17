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
  const userId = request.user

  if (!userId) {
    return response.status(401).json({ error: 'user invalid' })
  }

  const user = await User.findById(userId)

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    }
  )
  
  if (!blog.title) {
    response.status(400).end()
  } else if(!blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }

})

// ---- DELETE ID ----
blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  const idUserCreator = blog.user.toString()
  const idUserTryToDelete = request.user
  
  if (idUserCreator === idUserTryToDelete) {
    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'wrong token. invalid operation' })
  }

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