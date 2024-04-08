import express from 'express';
import { router as userRouter } from "../modules/Users/users.route.js"
import { router as racerRouter } from "../modules/Racer/racer.route.js"
import { router as competitionRouter } from "../modules/Competition/competition.route.js"

export const router = express.Router()

router.use("/users", userRouter)
router.use("/racer", racerRouter)
router.use("/competitions", competitionRouter)



