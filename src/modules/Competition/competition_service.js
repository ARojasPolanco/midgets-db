import Racer from '../Racer/racer.model.js';
import Competition from './competition.model.js'

export class CompetitionService {

    async createCompetition(data) {
        const { name, racerIds } = data;

        try {
            let competition = await Competition.create({ name });

            if (racerIds && racerIds.length > 0) {
                for (const racerId of racerIds) {
                    const racer = await Racer.findByPk(racerId);
                    if (racer) {
                        await competition.addRacer(racer);
                    }
                }
            }

            competition = await competition.reload({ include: Racer });

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
            include: Racer
        });
    }

    async findOneCompetition(id) {
        return await Competition.findOne({
            where: {
                id
            },
            include: Racer
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

    async selectWinner(competitionId, winnerId) {
        try {
            const competition = await Competition.findOne({
                where: {
                    id: competitionId
                },
                include: Racer
            });

            if (!competition) {
                throw new Error('Competición no encontrada');
            }

            const winner = competition.racers.find(racer => racer.id === winnerId);
            if (!winner) {
                throw new Error('Ganador no válido para esta competición');
            }

            return winner;
        } catch (error) {
            throw new Error('Error al seleccionar al ganador: ' + error.message);
        }
    }
}
