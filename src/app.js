require("dotenv").config();
const express = require("express");
const passport = require("passport");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const jwtStrategy = require("./authentication/strategies/jwt");
const localStrategy = require("./authentication/strategies/local");

const userRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const postRouter = require("./routes/postRouter");
const authRouter = require("./routes/authRouter");
const likeRouter = require("./routes/likeRouter");

const app = express();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
async function main() {
  await mongoose.connect(process.env.MONGODB);
}

main().catch((err) => console.log(err));

app.use(logger("dev"));
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://natsu-no-daisankaku-a.vercel.app/",
      "https://natsu-no-daisankaku.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

passport.use(jwtStrategy);
passport.use(localStrategy);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

// error handler
app.use((err, req, res, next) => {
  const errors = err.payload ? err.payload : [err.message];
  res.status(err.status || 500);
  res.json({ errors });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
