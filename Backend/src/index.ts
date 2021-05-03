import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter";

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);

const CONNECTION_URL =
  "mongodb+srv://bishal:bishal123@cluster0.ykvc3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(
        `Database connected successfully and app listening on port ${port}`
      );
    })
  )
  .catch((e) => {
    console.log(e.message);
  });
