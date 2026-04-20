import "./paths";
import app from "./app";

const port = process.env.PORT || 6000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: http://localhost:${port}`);
});
