import Racer from "../../modules/Racer/racer.model.js"
import Competition from "../../modules/Competition/competition.model.js"

export const initModel = () => {
    Competition.belongsToMany(Racer, { through: 'CompetitionRacer', foreignKey: 'competition_id' });
    Racer.belongsToMany(Competition, { through: 'CompetitionRacer', foreignKey: 'racer_id' });
}