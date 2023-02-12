import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const allRentals = db.query(`
    SELECT rentals.*, customers.name AS name_customer, customers.id AS id_customer, games.id AS id_game, games.name AS name_game
    FROM rentals
    JOIN customers
    ON "customerId" = customers.id
    JOIN games
    ON "gameId" = games.id;
    `)

    res.send(allRentals.rows).status(201)

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  let day = dayjs().format("YYYY-MM-DD");

  try {
    const idCustomerExist = await db.query(`
    SELECT * FROM customers WHERE id = $1`, [customerId]
    )

    if(idCustomerExist.rowCount === 0) return res.status(400).send("O id do cliente informado não existe")

    const idGameExist = await db.query(`
    SELECT * FROM games WHERE id = $1`, [gameId]
    )

    if(idGameExist.rowCount === 0) return res.status(400).send("O id do jogo informado não existe")




  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finishRental(req, res) {


}

export async function deleteRentalById(req, res) {
  const { id } = req.params;
  try {
    const rentalId = await db.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [id]
    );

    if (rentalId.rowCount === 0) return res.status(404).send("O id informado não existe");

    const finishedRental = db.query(`
      SELECT rentals."returnDate" FROM rentals WHERE id = $1
    `, [id])

    if (finishedRental.rowCount > 0 ) return res.status(400).send("Esse aluguel não foi finalizado");    
    
    await db.query(`
      DELETE FROM rentals WHERE id = $1
    `, [id])
    res.sendStatus(200)

  } catch (error) {
    res.status(500).send(error.message);
  }
}
