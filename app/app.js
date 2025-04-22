import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json()); // parses JSON request body
app.use(cors());

app.delete('/', async (req, res) => {
    if (req.body !== '') {
        const data = req.body.textData
        console.log(data)

        let file_content = fs.readFileSync('../data/todo.json', 'utf-8')
        console.log(" ** file ** :", file_content)
        let obj = JSON.parse(file_content)
        console.log(obj.length)
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].todo === data) {
                obj.splice(i, 1)
            }
        }
        console.log("*** obj *** :", obj)
        let str = JSON.stringify(obj)
        fs.writeFileSync('../data/todo.json', str);
        let file = fs.readFileSync('../data/todo.json', 'utf-8')
        console.log(" ** file_updated ** :", JSON.parse(file))
        res.json(file)
    }
})

app.post('/', async (req, res) => {
    let todos = [];

    if (req.body !== '') {
        todos.length = 0;
        // *** req.body *** : { todo: 'IDC Website' }
        let data = req.body
        // its in js obj, we will convert that into
        // string and put in file

        let file_content = fs.readFileSync('../data/todo.json', 'utf-8')
        console.log("*** file_content *** :", file_content)
        if (file_content.trim()) {
            todos = JSON.parse(file_content);
            // Convert string to array
        }
        todos.push(data)

        let str = JSON.stringify(todos)

        // something is wrong with writeFile
        fs.writeFile('../data/todo.json', str, (err) => {
            if (err) throw err;
            console.log('Data written');
        });
    }
    res.send(todos)
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



