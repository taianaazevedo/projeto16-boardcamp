import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  insertCustomer,
  updateCustomer,
} from "../controllers/customers.controller.js";

const routerCustomer = Router()

routerCustomer.get('/customers', getCustomers)
routerCustomer.get('/customers/:id', getCustomerById)
routerCustomer.post('customers', insertCustomer)
routerCustomer.put('/customers', updateCustomer)

export default routerCustomer