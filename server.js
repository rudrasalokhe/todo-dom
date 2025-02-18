// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Todo = require('./todo'); // Import the Todo class
const path = require('path');  // Import the path module

const app = express();
const port = 3003; // You can change the port if needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create an instance of the Todo class
const todoList = new Todo();

// Routes

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todoList.getAll());
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (task) {
        todoList.add(task);
        res.status(201).json({ message: 'Todo added successfully!' });
    } else {
        res.status(400).json({ message: 'Task is required!' });
    }
});

// Update a todo by index
app.put('/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { task } = req.body;
    if (!isNaN(index) && task) {
        todoList.update(index, task);
        res.json({ message: 'Todo updated successfully!' });
    } else {
        res.status(400).json({ message: 'Valid index and task are required!' });
    }
});

// Delete a todo by index
app.delete('/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (!isNaN(index)) {
        todoList.delete(index);
        res.json({ message: 'Todo deleted successfully!' });
    } else {
        res.status(400).json({ message: 'Valid index is required!' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
