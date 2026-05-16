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
    maxAmount = 0
    maxAuthor = ""
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
