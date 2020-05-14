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
 floria538612311!
 public key / b5973364a359065c34f06eb838ac0d2d
 private key : 4cb0e428ed955a2ae0087d69adde4564533595d1
 developer.marvel.com
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

// Make a request for a user with a given ID
/* axios
  .get("/user?ID=12345")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  }); */

// ALL ROUTE
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
  // res.send({"Page not found" });
});

// SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} started`);
});
