const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const TravelJournal = sequelize.define("TravelJournal", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("private", "public"), allowNull: false, defaultValue: "public" },
    location: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.BLOB("long"), allowNull: true }, // Store actual image binary data
}, { timestamps: false });

User.hasMany(TravelJournal, { foreignKey: "user_id", onDelete: "CASCADE" });
TravelJournal.belongsTo(User, { foreignKey: "user_id" });

module.exports = TravelJournal;
