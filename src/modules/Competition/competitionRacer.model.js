import { DataTypes, Model } from 'sequelize';
import { sequelize } from "../../config/database/database.js"

class CompetitionRacer extends Model { }

CompetitionRacer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    competitionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'competition_id'
    },
    racerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'racer_id'
    }
}, {
    sequelize,
    modelName: 'CompetitionRacer',
    tableName: 'competition_racer',
    timestamps: true
});

export default CompetitionRacer;