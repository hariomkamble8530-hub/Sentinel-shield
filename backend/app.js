const express = require("express");
const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
    res.json({ message: "Login Successful" });
});

app.get("/balance", (req, res) => {
    res.json({ balance: 5000 });
});

app.post("/transfer", (req, res) => {
    res.json({ message: "Transfer Successful" });
});

app.listen(8080, () => console.log("Backend running on 8080"));