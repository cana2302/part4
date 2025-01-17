const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  if (blogs.length === 0) {
    return 0

  } else if (blogs.length === 1) {
    return blogs[0].likes

  } else if (blogs.length > 1) {
    const likes = blogs.reduce((sum,blog) => {
      return sum + blog.likes
    },0)

    return likes 

  }
}

const favoriteBlog = (blogs) => {
  
  let fav = {
    title: "",
    author: "",
    likes: 0
  }
  const favorite = blogs.reduce(( fav, blog) => {

    if (blog.likes > fav.likes) {
      fav = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
    
    return fav

  },fav)

  return favorite
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.countBy(blogs, 'author');
  const authorBlogs = _.map(blogsByAuthor, (blogs, author) => ({
    author,
    blogs
  }))

  return _.maxBy(authorBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');

  const authorLikes = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }));

  return _.maxBy(authorLikes, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}