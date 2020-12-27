module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Todolist",
    {
      task: {
        type: DataTypes.STRING(255),
      },
      isComplete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tablename: "todolist",
      timestamp: false,
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.User);
  };

  return model;
};
