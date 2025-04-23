// 🔹 Import necessary modules
import express from 'express';
import cors from 'cors';
import fs from 'fs';

// 🔹 App setup
const app = express();
const port = 3000;

// 🔹 Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors());         // Enable Cross-Origin requests

// 🔹 DELETE route: Remove a todo item
app.delete('/', async (req, res) => {
    if (req.body !== '') {
        const data = req.body.textData; // Get text content to delete
        console.log("Deleting:", data);

        // Read the existing todos
        let file_content = fs.readFileSync('../data/todo.json', 'utf-8');
        let obj = JSON.parse(file_content);

        // Remove matching todo
        obj = obj.filter(todo => todo.todo !== data);

        // Write updated list back to file
        let updatedStr = JSON.stringify(obj);
        fs.writeFileSync('../data/todo.json', updatedStr);

        // Send updated list to frontend
        res.json(updatedStr);
    }
});

app.get('/', async (req, res) => {
        // Read the existing todos
        let file_content = fs.readFileSync('../data/todo.json', 'utf-8');
        let obj = JSON.parse(file_content);
        res.json(obj)
});

// 🔹 POST route: Add a new todo item
app.post('/', async (req, res) => {
    let todos = [];

    if (req.body !== '') {
        const data = req.body; // { todo: 'Some task' }

        // Read existing todos
        let file_content = fs.readFileSync('../data/todo.json', 'utf-8');

        if (file_content.trim()) {
            todos = JSON.parse(file_content);
        }

        // Add new todo to array
        todos.push(data);

        // Save updated array to file
        let updatedStr = JSON.stringify(todos);
        fs.writeFile('../data/todo.json', updatedStr, (err) => {
            if (err) throw err;
            console.log('Todo saved.');
        });

        // Send updated list to frontend
        res.send(todos);
    }
});

// 🔹 Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
