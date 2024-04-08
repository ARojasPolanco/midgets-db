import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js"

const Competition = sequelize.define('competition', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'competition_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'finish', 'pause', 'waiting'),
        allowNull: false,
        defaultValue: 'waiting'
    }
});

export default Competition;
