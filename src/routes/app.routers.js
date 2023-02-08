import { Router } from "express";
import routerGame from "./games.router.js";
// import routerCostumer from "./customers.router.js"
// import routerRental from "./rentals.router.js"


const routers = Router()

routers.use(routerGame)


export default routers