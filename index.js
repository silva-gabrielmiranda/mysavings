const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Ok!"))

app.post("/newData", (req, res) => {
    res.json(req.body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))