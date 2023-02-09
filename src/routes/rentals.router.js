import { Router } from "express";
import {
  getRentals,
  insertRental,
  deleteRentalById,
  finishRental,
} from "../controllers/rentals.controller.js";

const routerRental = Router()

routerRental.get('/rentals', getRentals)
routerRental.post('/rentals', insertRental)
routerRental.post('/rentals/:id/return', finishRental)
routerRental.delete('/rentals/:id', deleteRentalById)

export default routerRental