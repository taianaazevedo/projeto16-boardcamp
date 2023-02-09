import { Router } from "express";
import routerGame from "./games.router.js";
import routerCustomer from "./customers.router.js"
import routerRental from "./rentals.router.js"


const routers = Router()

routers.use(routerGame)
routers.use(routerCustomer)
routers.use(routerRental)


export default routers