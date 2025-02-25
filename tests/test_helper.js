const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "6788ef55af2741e2fada8e8d",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "6788ed6624bb8485c1686fe0",
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    _id: "6788ed6624bb8485c1686fe0",
    username: "mluukkai",
    name: "Matti Luukkainen",
    passwordHash: "$2a$10$szh5I1arp2eRDu4O.Th3leSLXLFc508rXYBblEupHb5iTi.1Zti3C",
    blogs: ["5a422aa71b54a676234d17f8"],
    __v: 0
  },
  {
    _id: "6788ef55af2741e2fada8e8d",
    username: "hellas",
    name: "Arto Hellas",
    passwordHash: "$2a$10$7fR431BTDkgU8SA93riGiuXIkUPkiKFpoEqRh.yKcjd2niHEmcpWu",
    blogs: ["5a422a851b54a676234d17f7","678a97ecf49d2358ed67d3f8"],
    __v: 0
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUsers, usersInDb
}