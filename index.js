const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const todolistRoutes = require("./routes/todolist");
const userRoutes = require("./routes/user");
const db = require("./models");
const todoListCron = require("./crons/crons");
require("./config/passport/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todolist", todolistRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "path not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

cron.schedule("0 1 * * *", () => {
  console.log("Delete all todo list at 1.00");
  todoListCron.deleteTodo();
});

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8000, () => {
    console.log("Server is running at port 8000");
  });
});
