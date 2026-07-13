import { TextField, Button } from "@mui/material";
import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(event) => {
          handleLogin(event, {
            username: username.value,
            password: password.value,
          });
        }}
      >
        <div>
          <label>
            <TextField {...username} />
          </label>
        </div>
        <div>
          <label>
            <TextField {...password} />
          </label>
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: 10, color: "darkcyan" }}
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
