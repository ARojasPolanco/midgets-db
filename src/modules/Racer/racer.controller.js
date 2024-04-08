import { AppError, catchAsync } from '../../errors/index.js';
import { validateRacer } from './racer.schema.js';
import { RacerService } from './racer_service.js';

export const racerService = new RacerService();


export const findAllRacer = catchAsync(async (req, res, next) => {
  const racer = await racerService.findAllRacer()

  return res.status(200).json(racer);
});

export const CreateRacer = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, racerData } = validateRacer(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const racer = await racerService.createRacer(racerData);

  return res.status(201).json(racer);
});

export const findOneRacer = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const racer = await racerService.findOneRacer(id)

  if (!racer) {
    next(new AppError(`Racer whit id ${id} not found`))
  }

  return res.json(racer)
});

export const updateRacer = catchAsync(async (req, res, next) => {

  const { hasError, errorMessages, racerData } = validateRacer(req.body)

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  const { id } = req.params

  const racer = await racerService.findOneRacer(id)

  if (!racer) {
    return next(new AppError(`Racer whit id ${id} nor found`))
  }

  const updateRacer = await racerService.updateRacer(racer, racerData)

  return res.status(200).json(updateRacer)
});

export const deleteRacer = catchAsync(async (req, res, next) => {

  const { id } = req.params

  const racer = await racerService.findOneRacer(id)

  if (!racer) {
    return next(new AppError(`Racer whit id ${id} not found`))
  }

  await racerService.deleteRace(racer)

  return res.status(200).json()

});
