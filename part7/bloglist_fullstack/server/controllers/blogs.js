const blogsRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "username name id");
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  if (!body.title) {
    response.status(400).end();
  }

  if (!body.url) {
    response.status(400).end();
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(400).json("cannot delete others blogs");
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id);

  if (!blogToUpdate) {
    response.status(404).end();
  }

  const body = request.body;

  if (body.title !== undefined) blogToUpdate.title = body.title;
  if (body.author !== undefined) blogToUpdate.author = body.author;
  if (body.url !== undefined) blogToUpdate.url = body.url;
  if (body.likes !== undefined) blogToUpdate.likes = body.likes;
  if (body.comments !== undefined) blogToUpdate.comments = body.comments;

  const updatedBlog = await blogToUpdate.save();
  const populatedBlog = await updatedBlog.populate("user", {
    username: 1,
    id: 1,
  });
  response.json(populatedBlog);
});

module.exports = blogsRouter;
