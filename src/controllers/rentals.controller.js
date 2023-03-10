import { db } from "../database/database.connection.js";
import dayjs from "dayjs";


export async function getRentals(req, res) {
  try {
    const allRentals = await db.query(`
    SELECT rentals.*, customers.name AS name_customer, customers.id AS id_customer, games.id AS id_game, games.name AS name_game
    FROM rentals
    JOIN customers
    ON "customerId" = customers.id
    JOIN games
    ON "gameId" = games.id;
    `);

    const listRentals = allRentals.rows.map((rent) => {
      return {
        id: rent.id,
        customerId: rent.customerId,
        gameId: rent.gameId,
        rentDate: rent.rentDate,
        daysRented: rent.daysRented,
        returnDate: rent.returnDate,
        originalPrice: rent.originalPrice,
        delayFee: rent.delayFee,
        customer: {
          id: rent.id_customer,
          name: rent.name_customer,
        },
        game: {
          id: rent.id_game,
          name: rent.name_game,
        },
      };
    });

    res.status(201).send(listRentals);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  let day = dayjs().format("YYYY-MM-DD");

  try {
    const customerExist = await db.query(
      `
    SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );

    if (customerExist.rowCount === 0) return res.status(400).send("O id do cliente informado não existe");

    const gameExist = await db.query(
      `
    SELECT * FROM games WHERE id = $1`,
      [gameId]
    );

    if (gameExist.rowCount === 0)
      return res.status(400).send("O id do jogo informado não existe");

    const isGameRented = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    );

    if (isGameRented.rowCount === gameExist.rows[0].stockTotal)
      return res.status(400).send("O jogo não está disponível");

    let rentDate = day;
    let originalPrice = Number(daysRented) * gameExist.rows[0].pricePerDay;

    await db.query(
      `
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
    VALUES ($1, $2, $3, $4, $5)
    `,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    );

    res.status(201).send("Aluguel cadastrado");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finishRental(req, res) {
  const { id } = req.params;
  try {

    const idExist = await db.query(`
      SELECT * FROM
      rentals 
      WHERE id = $1
    `, [id])
    if (idExist.rowCount === 0) return res.status(404).send("Esse id não existe");

    const rent = await db.query(`
      SELECT * FROM rentals WHERE id = $1
    `, [id])

    if(rent.rows[0].returnDate !== null ) return res.status(400).send("Este aluguel já está finalizado")

    let price = rent.rows[0].originalPrice / rent.rows[0].daysRented
    let returnDate = dayjs().format("YYYY-MM-DD")
    let difference = dayjs(returnDate).diff(rent.rows[0].rentDate, 'days')
    let delayFee = (difference <= rent.rows[0].daysRented) ? 0 : (difference - rent.rows[0].daysRented) * price 


    await db.query(`
      UPDATE rentals 
      SET "returnDate" = $1, "delayFee" = $2
      WHERE id = $3
    `, [returnDate, delayFee, id])

    res.status(200).send("Aluguel finalizado")

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteRentalById(req, res) {
  const { id } = req.params;
  try {
    const rentalId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

    if (rentalId.rowCount === 0) return res.status(404).send("O id informado não existe");

    
    if (rentalId.rows[0].returnDate === null) return res.status(400).send("Esse aluguel ainda não foi finalizado");

    await db.query(
      `DELETE FROM rentals 
      WHERE id = $1`,
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
