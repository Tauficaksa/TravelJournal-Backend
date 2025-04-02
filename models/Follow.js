const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Follow = sequelize.define("Follow", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    follower_id: { type: DataTypes.UUID, allowNull: false },
    following_id: { type: DataTypes.UUID, allowNull: false },
}, { timestamps: false });

User.hasMany(Follow, { foreignKey: "follower_id", onDelete: "CASCADE" });
Follow.belongsTo(User, { foreignKey: "follower_id", onDelete: "CASCADE" });

User.hasMany(Follow, { foreignKey: "following_id", onDelete: "CASCADE" });
Follow.belongsTo(User, { foreignKey: "following_id", onDelete: "CASCADE" });

module.exports = Follow;
