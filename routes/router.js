const express = require("express");

const router = new express.Router();

// Posts Routes
const postsRoutes = require("./posts");
router.use("/post", postsRoutes);

module.exports = router;