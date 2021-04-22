import express from "express"
import db from './database/index.js'
import config from "./config.js";
import indexRouter from "./routes/index.js"
import lessonsRouter from "./routes/lessonsRouter.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/lessons", lessonsRouter);
const port = config[process.env.NODE_ENV].port
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log("server is running on port" + port));
  })
  .catch((err) => console.log(err));

export default app