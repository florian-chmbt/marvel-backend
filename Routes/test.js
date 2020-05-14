// IMPORTER PACKAGE INDEX
const express = require("express");

// IMPORTER ROUTER
const router = express.Router();

// IMPORTER AUTRES PACKAGES

// IMPORTER LES MODELS

// ROUTE ------------------------------------------------
router.get("/test", async (req, res) => {
  // console.log(req.fields);
  try {
    // * Réponse serveur au client
    return res.json("Hello wolrd");

    // Catch
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// EXPORTER LES ROUTES
module.exports = router;
