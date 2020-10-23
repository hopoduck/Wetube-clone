import "@babel/polyfill";
import dotenv from "dotenv";
import app from "./app";
import "./db";

dotenv.config();

const PORT = process.env.PORT | 4000;

app.listen(PORT, () => console.log(`✅ Server Working : http://localhost:${PORT}`));
