import express from "express"

import { addPlayer, deletePlayer, getPlayerById, getPlayers, updatePlayer } from "../controllers/players.controllers.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { playerValidator } from "../validators/players.validators.js";


const router = express.Router();

router.post('/players', [BodyNotEmptyValidator, playerValidator, addPlayer]);
router.get('/players', getPlayers);
router.get('/players/:id', getPlayerById);
router.put('/players/:id', [BodyNotEmptyValidator, playerValidator, updatePlayer]);
router.delete('/players/:id', deletePlayer);


export default {
    routes: router
}