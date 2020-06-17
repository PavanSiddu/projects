const express = require("express")
const Todo = require("./db/models/user")
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const app = express()
const port = 5000

// app.use(cors({origin: 'localhost:3000',}))
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/todos', (req, res) => {
    const todo = new Todo(req.body)
    todo.save().then((todo) => {
        res.json({
            status: true,
            data: todo,
            message: "Successfully added a Todo"
        })
    }).catch((error) => {
        res.status(400).json({
            status: false,
            error,
            message: "Error while adding a Todo"
        })
    })
})

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.json({
            status: true,
            data: todos,
            message: `Successfully retrieved ${todos.length} todos`,
            count: todos.length
        })
    }).catch((error) => {
        res.status(500).json({
            status: false,
            error,
            message: "Error retrieving Todos"
        })
    })
})

app.put('/todos/:id', (req, res) => {
    let id = req.params.id
    let data = {
        todos: req.body.todos,
        status: req.body.status
    }
    Todo.findByIdAndUpdate(id, data, { new: true }).then((todos) => {
        res.json({
            status: true,
            data: todos,
            message: `Successfully updated`,
        })
    }).catch((error) => {
        res.json({
            status: false,
            error,
            message: "Error while updating Todos"
        })
    })
})

app.delete('/todos/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id).then((todos) => {
        res.json({
            status: true,
            data: todos,
            message: `Successfully deleted`,
        })
    }).catch((e) => {
        res.json({
            status: false,
            error,
            message: "Error while delting Todos"
        })
    })
})

app.delete('/todos/deleteAll/:status', (req, res) => {
    Todo.deleteMany({status:req.params.status}).then((todos) => {
        res.json({
            status: true,
            data: todos,
            message: `Successfully deleted`,
        })
    }).catch((e) => {
        res.json({
            status: false,
            error,
            message: "Error while delting Todos"
        })
    })
})
// app.all('/*', () => console.log("Hello"))


app.listen(port, () => {
    console.log('Server Running at Port: ' + port)
})
