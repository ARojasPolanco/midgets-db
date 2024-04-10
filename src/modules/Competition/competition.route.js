import express from 'express';
import {
    createCompetition,
    findAllCompetition,
    findOneCompetition,
    updateCompetition,
    updateStatusCompetition,
    finishCompetition,
    markWinnerController
} from './competition.controller.js';

import { protect, protectAccountOwner, restrictTo } from "../Users/users.middleware.js";

export const router = express.Router();

router.route('/')
    .get(findAllCompetition)
    .post(protect, restrictTo('admin'), createCompetition);


router.route('/:id')
    .get(findOneCompetition)
    .patch(protect, restrictTo('admin'), updateCompetition)
    .delete(protect, restrictTo('admin'), finishCompetition);

router.patch('/:id/status', protect, restrictTo('admin'), updateStatusCompetition);

router.post('/:id/winner', markWinnerController)