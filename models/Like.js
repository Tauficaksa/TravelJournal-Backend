const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const TravelJournal = require("./TravelJournal");

const Like = sequelize.define("Like", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    journal_id: { type: DataTypes.UUID, allowNull: false },
}, { timestamps: false });

User.hasMany(Like, { foreignKey: "user_id", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

TravelJournal.hasMany(Like, { foreignKey: "journal_id", onDelete: "CASCADE" });
Like.belongsTo(TravelJournal, { foreignKey: "journal_id", onDelete: "CASCADE" });

module.exports = Like;
