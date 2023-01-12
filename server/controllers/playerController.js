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
        const newPlayer = await db.query(`UPDATE players set name = $1, surname = $2, type = $3 where id = $4 RETURNING *`, [name, surname, type, id]);
        const newList = await db.query(`SELECT * FROM players`);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newList.rows);
    }
    async deletePlayer(req, res) {
        const playerId = req.params.id;
        const newPlayer = await db.query(`DELETE FROM players where id = $1`, [playerId]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json('ok');
    }
    async getPlayersOnDate(req, res) {
        const { date } = req.body;
        let answer = {};
        const newPlayer = await db.query(`SELECT * FROM players`);
        const logs = await db.query(`SELECT player_id, position FROM date_logs WHERE date = $1`, [date]);

        answer.status = 200;
        answer.date = date;
        answer.playerList = newPlayer.rows;
        answer.logs = logs.rows;

        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(answer);
    }
    async addsDateLog(req, res) {
        const { date, playerId, position } = req.body;
        const newPlayer = await db.query(`INSERT INTO date_logs (date, player_id, position) values ($1, $2, $3)`, [date, playerId, position]);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json(newPlayer.rows[0]);
    }
    //ыпа
}

module.exports = new Player();
