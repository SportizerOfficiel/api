import express from "express"
import { addMatch, deleteMatch, getMatchById, getMatchs, updateMatch } from "../controllers/matchs.controllers.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";
import { matchValidator } from "../validators/matchs.validators.js";

const router = express.Router();

router.post('/matchs', [BodyNotEmptyValidator, matchValidator, addMatch]);
router.get('/matchs', getMatchs);
router.get('/matchs/:id', getMatchById);
router.put('/matchs/:id', [BodyNotEmptyValidator, matchValidator, updateMatch]);
router.delete('/matchs/:id', deleteMatch);


export default {
    routes: router
}