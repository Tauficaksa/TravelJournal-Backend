const express = require("express");
const userRoutes = require("./routes/userRoutes");
const journalRoutes = require("./routes/journalRoutes");
const likeRoutes = require("./routes/likeRoutes");
const followRoutes = require("./routes/followRoutes");
const setupSwagger = require("./swagger");
const path=require("path")

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register API routes
app.use("/api/users", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

// Swagger setup
setupSwagger(app);

module.exports = app;
