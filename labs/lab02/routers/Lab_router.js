import express from "express";

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("welcome to the lab router")
})

router.get("/name", (req,res)=>{
    res.send("Hardik Jagtap")
})

router.get("/greetings", (req,res)=>{
    res.send("Hello from Hardik, student number : n01607043")
})

router.get("/add/:x/:y", (req,res)=>{
    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)
    res.send(`${x+y}`)
})

router.get("/calculate/:x/:y/:operation", (req,res)=>{
    let x = parseFloat(req.params.x)
    let y = parseFloat(req.params.y)
    let operation = req.params.operation
    let result = 0;

    switch (operation) {
        case "+":
            result = x+y;
            break;
        case "-":
            result = x-y;
            break;
        case "*":
            result = x*y;
            break;
        case "/":
            if (y === 0) {
                return res.send("Error: Division by zero is not allowed.");
            }
            result = x / y;
            break;
        default:
            res.send("invalid operator")
            break;
    }
    res.send(`${result}`)
})

export default router;