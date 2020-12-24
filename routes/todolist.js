const express = require('express');
const router = express.Router();
const todolistControllers = require('../controllers/todolist')

router.get('/', todolistControllers.getTodolist);
router.post('/', todolistControllers.createTodolist);
router.put('/:id', todolistControllers.updateTodolist);

module.exports = router;