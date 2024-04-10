import { AppError, catchAsync } from '../../errors/index.js';
import Racer from '../Racer/racer.model.js';
import { validateCompetition } from './competition.schema.js'
import { CompetitionService } from './competition_service.js'

const competitionService = new CompetitionService();

export const createCompetition = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, competitionData } = validateCompetition(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const competition = await competitionService.createCompetition(competitionData);

    return res.status(201).json(competition);
});

export const findAllCompetition = catchAsync(async (req, res, next) => {
    const competition = await competitionService.findAllCompetition()

    return res.status(200).json(competition)
})

export const findOneCompetition = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const competition = await competitionService.findOneCompetition(id)

    if (!competition) {
        next(new AppError(`Competition whit id ${id} not found`))
    }

    return res.json(competition)
})

export const updateStatusCompetition = catchAsync(async (req, res, next) => {

    const { id, newStatus } = req.body

    const competition = await competitionService.findOneCompetition(id)

    if (!competition) {
        next(new AppError(`Competition whit id ${id} not found`))
    }

    await competitionService.updateCompetitionStatus(competition, newStatus)

    return res.status(200).json(competition)
})

export const updateCompetition = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, competitionData } = validateCompetition(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const { id } = req.params

    const competition = await competitionService.findOneCompetition(id)

    if (!competition) {
        next(new AppError(`Competition whit id ${id} not found`))
    }

    const updateCompetition = await competitionService.updateCompetition(competition, competitionData)

    return res.status(200).json(updateCompetition)
})

export const finishCompetition = catchAsync(async (req, res, next) => {

    const { id } = req.params

    const competition = await competitionService.findOneCompetition(id)

    if (!competition) {
        next(new AppError(`Competition with id ${id} not found`))
    }

    await competitionService.finishCompetition(competition)

    return res.status(200).json({
        message: 'The competition has benn finished'
    })
})

export const markWinnerController = async (req, res) => {
    try {
        const competitionId = req.params.id;
        const winnerId = req.body.winnerId;

        const winner = await competitionService.selectWinner(competitionId, winnerId);

        res.json({ winner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};