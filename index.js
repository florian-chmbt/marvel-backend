/*
npm init -y
npm install axios
npm install md5
npm install mongoose express compression express-formidable uid2 crypto-js cloudinary
npm install dotenv   -> active le fichier .env
npm install cors     -> débloque une mesure de sécurité des navigteur web pour etre accessible par ttlm : permet au code frontend d'appeler l'API serveur LebonCoin
---------------------
npx nodemon index.js
-------------------
*/

// Activation des variables d'environnement du fichier `.env`
require("dotenv").config();

// Activation Packages et Middlewares
const express = require("express");
const app = express();
const formidable = require("express-formidable");
app.use(formidable());

// Autorise tous les sites à appeler votre API
const cors = require("cors");
app.use(cors());

// IMPORTATIONS DES ROUTES
const comById = require("./Routes/comicsById");
const char = require("./Routes/characters");
const comics = require("./Routes/comics");
const test = require("./Routes/test");

// ACTIVATIONS DES ROUTES
app.use(comById);
app.use(char);
app.use(comics);
app.use(test);

// TEST
app.all("/", (req, res) => {
  res.status(400).json("Salut Marvel");
  // res.send({"Page not found" });
});

// ALL ROUTE
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
  // res.send({"Page not found" });
});

// SERVER
app.listen(process.env.PORT || process.env.LOCALPORT, () => {
  console.log(`Server ${process.env.LOCALPORT} started`);
});
