import express from "express"

import { addPresentPlayer, deletePresentPlayer, getPresentPlayerById, getPresentPlayers, updatePresentPlayer } from "../controllers/presentPlayers.controllers.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { presentPlayerValidator } from "../validators/presentPlayers.validators.js";


const router = express.Router();

router.post('/presentPlayers', [BodyNotEmptyValidator, presentPlayerValidator, addPresentPlayer]);
router.get('/presentPlayers', getPresentPlayers);
router.get('/presentPlayers/:id', getPresentPlayerById);
router.put('/presentPlayers/:id', [BodyNotEmptyValidator, updatePresentPlayer]);
router.delete('/presentPlayers/:id', deletePresentPlayer);


export default {
    routes: router
}