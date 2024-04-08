import { AppError, catchAsync } from "../../errors/index.js";
import { RacerService } from "./racer_service.js";

const racerService = new RacerService

export const validExistRacer = catchAsync(async (req, res, next) => {

    const { id, racerId } = req.params;

    const racer = await racerService.findOneRacer(id, racerId)

    if (!racer) {
        next(new AppError("This racer does not exist", 404))
    }

    req.racer = racer;
    next()

})