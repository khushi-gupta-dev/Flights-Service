const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({message:"coming from v2 api"})
})

module.exports = router; 