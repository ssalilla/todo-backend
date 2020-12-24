const db = require('../models');

const getTodolist = async (req, res) => {
    const todolist = await db.Todolist.findAll();
    res.status(200).send(todolist);
};


const createTodolist = async (req, res) => {
    const newTodo = await db.Todolist.create({
        task: req.body.task
    });
    res.status(201).send(newTodo);
};

const updateTodolist = async (req, res) => {
    const targetId = Number(req.params.id);
    const newTask = req.body.task;
    await db.Todolist.update({
        task: newTask
    }, {
        where:  { id: targetId }
    });
    res.status(200).send({message: "Updating is success"});
};

module.exports = {
    createTodolist,
    getTodolist,
    updateTodolist
}