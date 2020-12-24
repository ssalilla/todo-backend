module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Todolist', {
        task: {
            type: DataTypes.STRING(255)
        }
    }, {
        tablename: 'todolist',
        timestamp: false,
    });

    return model;
}