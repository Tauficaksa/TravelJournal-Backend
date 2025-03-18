const sequelize = require("../config/database");

// Import models
const User = require("./User");  // Ensure correct case
const TravelJournal = require("./TravelJournal");
const Like = require("./Like");
const Follower = require("./Follow");

// Define Relationships
User.hasMany(TravelJournal, { foreignKey: "user_id", onDelete: "CASCADE" });
TravelJournal.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(User, { as: "Followers", through: Follower, foreignKey: "following_id" });
User.belongsToMany(User, { as: "Following", through: Follower, foreignKey: "follower_id" });

User.hasMany(Like, { foreignKey: "user_id", onDelete: "CASCADE" });
TravelJournal.hasMany(Like, { foreignKey: "journal_id", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "user_id" });
Like.belongsTo(TravelJournal, { foreignKey: "journal_id" });

// Sync models with database
(async () => {
    try {
        await sequelize.sync();
        console.log("✅ Database & tables created!");
    } catch (err) {
        console.error("❌ Error syncing database:", err);
    }
})();

module.exports = { sequelize, User, TravelJournal, Like, Follower };
