const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

mongoose.connect('mongodb+srv://mysavings:pfQmiYJD9vKlSvmk@cluster0-vmm7w.gcp.mongodb.net/mysavings?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }); // Iniciando o Database

const savingDataSchema = new mongoose.Schema({
    _id: String,
    description: String,
    date: Date,
    amount: Number,
    type: Number,
    price: Number
}); //Cria o schema no banco (semelhante a criação de um objeto "tabela")

const savings = mongoose.model("savings", savingDataSchema); //indica em qual collection do mongoDB o Schema será salvo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("MongoDB foi conectado.")
});
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Ok!"))

app.post("/newData", (req, res) => {
    const { price, amount, type, description, date } = req.body;
    let Saving = new savings({
        _id: uuidv4(),
        date,
        price,
        amount,
        type,
        description
    });
    console.log(Saving);
    Saving.save().then(() => res.json({ message: "Conta Salva", _id: Saving._id })).catch(err => res.json({ message: `Falha no salvamento: ${err}` }))
});

app.post("/getAllData", async (req,res) => {
    let allSavings = await savings.find({})
    res.json({allSavingsLog: allSavings})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))