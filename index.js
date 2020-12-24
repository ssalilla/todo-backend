const express = require('express');
const app = express();
const cors = require('cors');
const todolistRoutes = require('./routes/todolist')
const db = require('./models');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extend:false}));

app.use('/todolist', todolistRoutes);

db.sequelize.sync().then(()=> {
    
    app.listen(8000, () => {
    console.log("Server is running at port 8000");
});

});


