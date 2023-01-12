const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController.js');

router.post('/player', playerController.createPlayer);
router.get('/player', playerController.getPlayer);
router.get('/player/:id', playerController.getOnePlayer);
router.post('/update-player', playerController.updatePlayer);
router.get('/delete-player/:id', playerController.deletePlayer);
router.post('/get-players-on-date', playerController.getPlayersOnDate);
router.post('/adds-date-log', playerController.addsDateLog);

module.exports = router;
