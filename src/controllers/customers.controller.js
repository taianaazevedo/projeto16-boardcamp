import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");

    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const customerId = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);

    if (customerId.rowCount === 0) return res.status(404).send("O id informado não existe");

    res.send(customerId.rows[0])
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertCustomer(req, res) {

}

export async function updateCustomer(req, res) {
    
}
