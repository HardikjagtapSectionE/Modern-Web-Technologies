import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// CRUD -> server is setup to do this things
// Methods : GET(READ), PORT(CREATE), PUT(UPDATE), DELETE;

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to server - GET");
});

app.post("/", (req, res) => {
    res.send("Welcome to server - POST");
});

app.put("/", (req, res) => {
    res.send("Welcome to server - PUT");
});

app.delete("/", (req, res) => {
    res.send("Welcome to server - DELETE");
});


app.get("/search", (req,res)=> {
    console.log(req.url)
    console.log(req.headers)
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    res.send("you came to /search route")
})

// Start the server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
