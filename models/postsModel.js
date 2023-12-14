const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    isActive: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model("posts", postsSchema);