import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  insertCustomer,
  updateCustomer,
} from "../controllers/customers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customers.schema.js";

const routerCustomer = Router()

routerCustomer.get('/customers', getCustomers)
routerCustomer.get('/customers/:id', getCustomerById)
routerCustomer.post('customers', validateSchema(customerSchema), insertCustomer)
routerCustomer.put('/customers', validateSchema(customerSchema), updateCustomer)

export default routerCustomer