import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games ORDER BY id ASC");

    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  try {
    const gameNameExist = await db.query(
      `SELECT * FROM games WHERE name = $1`,
      [name]
    );

    if (gameNameExist.rowCount > 0)
      return res.status(409).send("Já existe um jogo cadastrado com esse nome");

    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
      [name, image, parseInt(stockTotal), parseInt(pricePerDay)]
    );

    return res.status(201).send("Jogo cadastrado!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
