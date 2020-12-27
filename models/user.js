module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
  });

  model.associate = (models) => {
    model.hasMany(models.Todolist);
  };

  return model;
};
