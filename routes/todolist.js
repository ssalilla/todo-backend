const express = require("express");
const router = express.Router();
const todolistControllers = require("../controllers/todolist");
const passport = require("passport");

const authentication = passport.authenticate("jwt", { session: false });

router.get("/", authentication, todolistControllers.getTodolist);
router.post("/", authentication, todolistControllers.createTodolist);
router.put("/:id", authentication, todolistControllers.updateTodolist);

module.exports = router;
