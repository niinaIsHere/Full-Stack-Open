import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useBlogActions } from "../store";
import { useField } from "../hooks";

const BlogForm = ({ creator }) => {
  const navigate = useNavigate();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const { add } = useBlogActions();

  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: creator,
    };

    add(blog);

    navigate("/blogs");
  };

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
          <TextField {...title} />
        </label>
        <br />
        <label>
          <TextField {...author} />
        </label>
        <br />
        <label>
          <TextField {...url} />
        </label>
        <br />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
