const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
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

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 7,
      __v: 0
    }
  ]

    test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    assert.strictEqual(result, 12)
  })

  const listWithNoBlogs = []

    test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })
})

describe('favorite blog', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Good',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 7,
      __v: 0
    }
  ]

    test('returns most liked out of two', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlogs)
        assert.deepStrictEqual(result, { _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Good',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
            likes: 7,
            __v: 0
            })
    })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
  ]

    test('returns most liked out of one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        })
    })

  const listWithNoBlogs = []

    test('empty list returns none', () => {
        const result = listHelper.favoriteBlog(listWithNoBlogs)
        assert.deepStrictEqual(result, null)
    })
})