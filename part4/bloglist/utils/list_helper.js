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
    
}

module.exports = {
  dummy,
  totalLikes
}
