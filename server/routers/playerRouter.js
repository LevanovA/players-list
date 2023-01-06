const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController.js');

router.post('/player', playerController.createPlayer);
router.get('/player', playerController.getPlayer);
router.get('/player/:id', playerController.getOnePlayer);
router.put('/player', playerController.updatePlayer);
router.delete('/player/:id', playerController.deletePlayer);

module.exports = router;
