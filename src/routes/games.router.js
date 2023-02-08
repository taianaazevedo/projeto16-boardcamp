import { Router } from "express";
import { getGames } from "../controllers/games.controller.js";

const routerGame = Router()

routerGame.get('/games', getGames)


export default routerGame