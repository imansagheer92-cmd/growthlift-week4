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