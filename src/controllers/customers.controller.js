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
    const customerId = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      id,
    ]);

    if (customerId.rowCount === 0)
      return res.status(404).send("O id informado não existe");

    res.send(customerId.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const customerCpf = await db.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );

    if (customerCpf.rowCount > 0)
      return res.status(409).send("Esse cpf já está cadastrado");

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.status(201).send("Cliente cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCustomer(req, res) {}
