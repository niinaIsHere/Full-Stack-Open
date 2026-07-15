import { TextField, Button } from "@mui/material";
import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useBlogActions } from "../store";

const CommentForm = ({ blog_id }) => {
  const navigate = useNavigate();

  const content = useField("text");

  const { comment } = useBlogActions();

  const addComment = (event) => {
    event.preventDefault();
    const newComment = {
      content: content.value,
    };

    comment(blog_id, newComment);

    navigate(`/blogs/${blog_id}`);
  };

  return (
    <div>
      <h3>Add a comment</h3>

      <form onSubmit={addComment}>
        <label>
          <TextField {...content} />
        </label>
        <br />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          comment
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
