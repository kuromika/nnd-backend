require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");

const jwtStrategy = require("./src/authentication/strategies/jwt");
const localStrategy = require("./src/authentication/strategies/local");

const userRouter = require("./src/routes/userRouter");
const postRouter = require("./src/routes/postRouter");
const authRouter = require("./src/routes/authRouter");

const app = express();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(process.env.MONGODB);
}

main().catch((err) => console.log(err));

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(jwtStrategy);
passport.use(localStrategy);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

// error handler
app.use((err, req, res, next) => {
  const errors = err.payload ? err.payload : [err.message];
  res.status(err.status || 500);
  res.json({ errors });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
