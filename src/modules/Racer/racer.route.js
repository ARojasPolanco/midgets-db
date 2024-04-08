import express from 'express';

export const router = express.Router();

import {
      findAllRacer,
      findOneRacer,
      CreateRacer,
      updateRacer,
      deleteRacer
} from "./racer.controller.js"
import { validExistRacer } from "./racer.middleware.js"
import { protect, protectAccountOwner, restrictTo } from "../Users/users.middleware.js"

router.route('/')
      .get(findAllRacer)
router.route("/:id")
      .get(validExistRacer, findOneRacer)

router.use(protect)

router.route("/")
      .post(restrictTo("admin"), CreateRacer)

router.route('/:id')
      .patch(restrictTo("admin"), updateRacer)
      .delete(restrictTo("admin"), deleteRacer)

