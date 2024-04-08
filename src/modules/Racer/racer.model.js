import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js"

const Racer = sequelize.define('racers', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: 'racers_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
});

export default Racer;