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
    racerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'racers_id'
    },
    status: {
        type: DataTypes.ENUM('active', 'finish', 'pause', 'waiting'),
        allowNull: false,
        defaultValue: 'waiting'
    }
})

export default Competition;