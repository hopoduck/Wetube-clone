import dotenv from "dotenv";
import app from "./app";
import { routes } from "./routes";
// import "./db";

dotenv.config();

const PORT = process.env.PORT;

app.set();

app.get(routes.home, (req, res) => {
  res.render("home");
});

app.listen(PORT, () => console.log(`✅ Server Working : http://localhost:${PORT}`));
