const db = require("../models");

const getTodolist = async (req, res) => {
  const todolist = await db.Todolist.findAll({
    where: { UserId: req.user.id },
  });
  res.status(200).send(todolist);
};

const createTodolist = async (req, res) => {
  const newTodo = await db.Todolist.create({
    task: req.body.task,
    isComplete: false,
    UserId: req.user.id,
  });
  res.status(201).send(newTodo);
};

const updateTodolist = async (req, res) => {
  const targetId = Number(req.params.id);
  const newTask = req.body.task;
  const newIsComplete = req.body.isComplete;
  const targetTodo = await db.Todolist.findOne({
    where: { id: targetId, UserId: req.user.id },
  });
  if (targetTodo) {
    await targetTodo.update({
      task: newTask,
      isComplete: newIsComplete,
    });
    res.status(200).send({ message: "Updating is successed" });
  } else {
    res.status(404).send({ message: "Todolist is Not Found" });
  }
};

module.exports = {
  createTodolist,
  getTodolist,
  updateTodolist,
};
