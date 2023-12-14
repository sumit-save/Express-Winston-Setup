const express = require("express");
const postsController = require("../controllers/postsController");

const router = new express.Router();

// Add a new post
router.post("/", (req, res) => {
    postsController.Add(req, res);
});

// Show all posts
router.get("/", (req, res) => {
    postsController.All(req, res);
});

// Show specific post
router.get("/:_id", (req, res) => {
    postsController.Show(req, res);
});

// Update specific post
router.put("/:_id", (req, res) => {
    postsController.Update(req, res);
});

// Remove specific post
router.delete("/:_id", (req, res) => {
    postsController.Remove(req, res);
});

module.exports = router;