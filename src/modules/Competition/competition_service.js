import Racer from '../Racer/racer.model.js';
import Competition from './competition.model.js'

export class CompetitionService {

    async createCompetition(data) {
        const { name, racerId } = data;

        try {
            const competition = await Competition.create({ name, racerId });

            if (racerId && racerId.length > 0) {
                await competition.setRacers(racerId);
            }

            return competition;
        } catch (error) {
            throw new Error('Error al crear la carrera: ' + error.message);
        }
    }

    async findAllCompetition() {
        return await Competition.findAll({
            where: {
                status: 'waiting'
            },
        });
    }

    async findOneCompetition(id) {
        return await Competition.findOne({
            where: {
                id
            }
        });
    }

    async updateCompetitionStatus(competition, newStatus) {
        const validStatus = ['active', 'finish', 'pause', 'waiting'];

        if (!validStatus.includes(newStatus)) {
            throw new Error('Invalid status provided');
        }

        const currentStatus = competition.status;
        if (currentStatus === 'finish' && newStatus === 'active') {
            throw new Error('Cannot change status from finish to active');
        }

        competition.status = newStatus;
        await competition.save();

        return competition;
    }

    async updateCompetition(competition, data) {
        return await competition.update(data)
    }


    async finishCompetition(competition) {
        return await competition.update({
            status: 'finish'
        })
    }
}
