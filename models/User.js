const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    firebase_uid: { 
        type: DataTypes.STRING, 
        allowNull: true, 
        unique: true, 
        defaultValue: "firebaseid"
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    pwd: { 
        type: DataTypes.STRING, 
        allowNull: false  // Ensure password is required
    },
    profile_image: { 
        type: DataTypes.BLOB("long"), 
        allowNull: true  // Store actual image binary data
    }
}, { timestamps: false });

module.exports = User;
