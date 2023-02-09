import { Router } from "express";
import { getGames, createGame } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schema.js";

const routerGame = Router()

routerGame.get('/games', getGames)
routerGame.post('/games', validateSchema(gameSchema), createGame)


export default routerGame