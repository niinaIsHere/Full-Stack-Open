const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const initialSum = 0
    const totalSum = blogs.reduce((sum, blog) => sum + blog.likes, initialSum)
    return totalSum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    faveBlog = blogs.reduce((max, blog) => {
        if (blog.likes > max.likes) {
            max = blog
        }
        return max
    })
    return faveBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const groupedBlogs = _.groupBy(blogs, 'author')
    let maxAmount = 0
    let maxAuthor = ""
    for (const [author, blogs] of Object.entries(groupedBlogs)) {
        if (blogs.length > maxAmount) {
            maxAmount = blogs.length
            maxAuthor = author
        }
    }
    return {
        author: maxAuthor,
        blogs: maxAmount
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const groupedBlogs = _.groupBy(blogs, 'author')
    let maxLikesAuthor = ""
    let maxLikes = 0
    const initSum = 0
    for (const [author, blogsByAuthor] of Object.entries(groupedBlogs)) {
        const likes = blogsByAuthor.reduce((sum, blog) => sum + blog.likes, initSum)
        if (likes > maxLikes) {
            maxLikes = likes
            maxLikesAuthor = author
        }
    }
    return {
        author: maxLikesAuthor,
        likes: maxLikes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
