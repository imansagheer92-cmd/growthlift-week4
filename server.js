let tasks = [
    {
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build REST API",
        done: false
    }
];

const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to GrowthLift API");
});

app.get("/about", (req, res) => {
    res.send("This is the About route");
});

app.get("/api/interns", (req, res) => {
    res.json({
        interns: ["Ali", "Sara", "Bilal"]
    });
});

app.get("/api/interns/:id", (req, res) => {
    res.json({
        id: req.params.id,
        name: "Sample Intern"
    });
});

app.get("/api/search", (req, res) => {
    res.json({
        query: req.query.q
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
    const task = tasks.find(
        t => t.id === parseInt(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find(
        t => t.id === parseInt(req.params.id)
    );

    if (!task) {
        return res.status(404).json({
            message: "Not found"
        });
    }

    task.title = req.body.title;
    task.done = req.body.done;

    res.json(task);
});

app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(
        t => t.id !== parseInt(req.params.id)
    );

    res.status(204).send();
});