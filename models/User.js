const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    firebase_uid: { type: DataTypes.STRING, allowNull: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    pwd: { 
        type: DataTypes.STRING, 
        allowNull: true,
        set(value) {
            if (value === "firebase") {
                this.setDataValue("pwd", "firebase");
            } else {
                this.setDataValue("pwd", value);
            }
        }
    },
    profile_image: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false });

module.exports = User;
