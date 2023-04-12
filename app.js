const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});