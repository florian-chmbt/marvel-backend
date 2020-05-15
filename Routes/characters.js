// IMPORTER PACKAGE INDEX
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
// const uid2 = require("uid2"); // -> chaine de char aléatoir
const md5 = require("md5");
const axios = require("axios");

// ACTIVATION PACKAGE INDEX
const app = express();
app.use(formidable());
app.use(cors());

// IMPORTER ROUTER
const router = express.Router();

// IMPORTER AUTRES PACKAGES

// 1) API KEY
const public_Key = process.env.MARVEL_PUBLIC_APIKEY;
const private_Key = process.env.MARVEL_PRIVATE_APIKEY;

// 2) TIMESTAMP (chaine de char aléatoire = alternative à UID2)
const date = new Date();
const timestamp = date.getTime() / 1000; // 1000 pour convertir des millisecondes en secondes
const ts = Math.floor(timestamp); // => 1582129584

// 3) HASH
const hash = md5(ts + private_Key + public_Key);
// console.log(ts); // => 1582129584
// console.log(hash); // => 7408e71006c87a79b21594220c35577c

// TESTER LA REQUETE ENVOYE VERS API AVEC CONSOLE ---------------------------------------------
const fetchData = axios
  .get(
    // * METHODE QUERY :
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_Key}&hash=${hash}`

    // * METHODE PARAMS :
    //       "https://gateway.marvel.com/v1/public/characters", {
    //     params: {
    //       apikey: public_Key,
    //       ts: ts,
    //       hash: hash,
    //     },
    //     Headers: {
    //       Accept: "*/*",
    //     },
    //   }
  )
  .then((response) => {
    // console.log(response.data); // TEST DE LA REPONSE DE LA REQUETE VERS L'API
  });

// ROUTE SERVEUR : CRUD READ ------------------------------------------------
router.get("/characters", async (req, res) => {
  console.log(req.query);
  console.log(req.query.page);

  // FILTRE QUERY : PAGE

  const limit = 100;
  let page = Number(req.query.page);
  if (!page) {
    // * si le filtre page n'est pas défini en requête
    page = 1; // Forcer à afficher la première page
  }
  const skip = (page - 1) * limit;

  // URL
  let url1 = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${skip}&ts=${ts}&apikey=${public_Key}&hash=${hash}`;
  let url2 = `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${skip}&ts=${ts}&apikey=${public_Key}&hash=${hash}`;
  // console.log(response.data.data);
  try {
    const response1 = await axios.get(url1);
    const characters1 = response.data.data;
    const response2 = await axios.get(url2);
    const characters2 = response.data.data;

    // REPONSE SERVEUR
    // return res.json("Hello marvel");
    return res.json(characters1);
    // Catch
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// EXPORTER LES ROUTES
module.exports = router;
