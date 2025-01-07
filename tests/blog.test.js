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