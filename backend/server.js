const express = require("express");

const postRoutes = require("./routes/post.routes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();
const port =5000;


dotenv.config();
connectDB();


//connection au serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));

//middleware pour traiter la request
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use("/post", postRoutes);
