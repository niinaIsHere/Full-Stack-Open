const blog = require("../models/blog")

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
