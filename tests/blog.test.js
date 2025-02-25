const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const listWithZeroBlog = []
  
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlog)
    assert.strictEqual(result, 0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const biggerList = [
    {
      title: "MiduDev",
      author: "Miguel Ángel Durán",
      url: "https://midu.dev/",
      likes: 2485,
      id: "6778497dea250dbf67cbc9e2"
    },
    {
      title: "Programación en Español",
      author: "Pedro Plasencia",
      url: "https://programacion-es.dev/",
      likes: 445,
      id: "67784d517af76b316a503faa"
    },
    {
      title: "Web Dev",
      author: "Miembros del equipo de Chrome",
      url: "https://web.dev/?hl=es-419",
      likes: 1062,
      id: "67784e34bb3debe689624392"
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    assert.strictEqual(result, 3992)
  })

})

describe('Helper Functions and Unit Tests, step: 3, 4 and 5', () => {

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  const favorite = 
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
  
  test('finds out which blog has the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, favorite)
  })

  test('finds out which author has most blogs', () => {
   
    const mostBlogAuthor = 
    {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result1 = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result1, mostBlogAuthor)
  })

  test('finds out which author has most likes totally', () => {
   
    const mostLikesByAuthor = 
    {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    const result2 = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result2, mostLikesByAuthor)
  })

})