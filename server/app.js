import express from "express";
import connect from "./db/connection.js";
import userRouter from "./routes/user-router.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import "dotenv/config";
import notFound from "./middlewares/not-found.js";

const app = express();
const uri = process.env.URI;
const port = process.env.PORT || 8000;

// middleware.
app.use(express.json());

// routes
app.use("/api/v1", userRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

// start the server.
async function start_server(uri) {
  try {
    await connect(uri);
    app.listen(port, () =>
      console.log(`connected to Database at server http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}

start_server(uri);
