const db = require('../db');

class Player {
    async createPlayer(req, res) {
        const { name, surname, type } = req.body;
        const newPlayer = await db.query(`INSERT INTO players (name, surname, type) values ($1, $2, $3) RETURNING *`, [name, surname, type]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows[0]);
    }
    async getPlayer(req, res) {
        const newPlayer = await db.query(`SELECT * FROM players`);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows);
    }
    async getOnePlayer(req, res) {
        const playerId = req.params.id;
        const newPlayer = await db.query(`SELECT * FROM players where id = $1`, [playerId]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows[0]);
    }
    async updatePlayer(req, res) {
        const { id, name, surname, type } = req.body;
        const newPlayer = await db.query(`UPDATE players set name = $1, surname = $2, type = $3 where id = $4 RETURNING *`, [
            name,
            surname,
            type,
            id,
        ]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows[0]);
    }
    async deletePlayer(req, res) {
        const playerId = req.params.id;
        const newPlayer = await db.query(`DELETE FROM players where id = $1`, [playerId]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows[0]);
    }
    //some
}

module.exports = new Player();
