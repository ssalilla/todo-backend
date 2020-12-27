const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const targetuser = await db.User.findOne({ where: { username: username } });
    if (targetuser) {
      res.status(400).send({ message: "Username has already taken." });
    } else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      await db.User.create({
        username: username,
        password: hashedPassword,
      });

      res.status(201).send({ Message: "Your ID has been created!!" });
    }
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (!targetUser) {
    res.status(400).send({ message: "Username or Password is wrong" });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.password
    );
    if (isCorrectPassword) {
      const payload = {
        username: targetUser.username,
        id: targetUser.id,
      };
      const token = jwt.sign(payload, "salilla", { expiresIn: 360000 });

      res.status(200).send({
        token: token,
        message: "Login Successful!!",
      });
    } else {
      res.status(400).send({ message: "Username or Password is wrong" });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};
