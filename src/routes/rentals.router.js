import { Router } from "express";
import {
  getRentals,
  insertRental,
  deleteRentalById,
  finishRental,
} from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {rentalSchema} from '../schemas/rentals.schema.js'

const routerRental = Router()

routerRental.get('/rentals', getRentals)
routerRental.post('/rentals', validateSchema(rentalSchema), insertRental)
routerRental.post('/rentals/:id/return', finishRental)
routerRental.delete('/rentals/:id', deleteRentalById)

export default routerRental