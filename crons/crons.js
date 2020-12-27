const db = require("../models");

const deleteTodo = async () => {
  try {
    await db.Todolist.destroy({ where: {} });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  deleteTodo,
};
