require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/miapp";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error conectando a MongoDB:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => res.send("Backend funcionando 🚀"));

app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post("/api/users", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
