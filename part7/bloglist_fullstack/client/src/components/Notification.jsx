import { Alert } from "@mui/material";
import { useNotification } from "../store";

const Notification = () => {
  const message = useNotification();
  if (!message) {
    return;
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={message.type}>
      {message.text}
    </Alert>
  );
};

export default Notification;
