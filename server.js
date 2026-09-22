require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const Task = require("./models/Task");

const helmet = require("helmet");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));



app.use(helmet());
app.use(cors());


app.use(express.json());

app.use("/api/auth", authRoutes);

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

app.get("/api/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const task = await Task.create({
        title: req.body.title
    });

    res.status(201).json(task);
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        res.json(task);

    } catch (err) {
        res.status(400).json({
            message: "Invalid ID format"
        });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();

  } catch (err) {
    res.status(400).json({ message: "Invalid task ID" });
  }
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});