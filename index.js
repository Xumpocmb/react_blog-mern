import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(4444, (err) => {
    if (err) {
        return console.log("something bad happened:", err);
    }

    console.log("Server started on port 4444");
});