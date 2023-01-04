import express from "express"

import {addClub, deleteClub, getClubById, getClubs, updateClub} from '../controllers/clubs.controllers.js'
import { clubValidator } from "../validators/clubs.validators.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";


const router = express.Router();
router.post('/townhalls/:idTH/clubs', [BodyNotEmptyValidator, clubValidator, addClub]);
router.post('/clubs', [BodyNotEmptyValidator, clubValidator, addClub]);
router.get('/townhalls/:idTH/clubs', getClubs);
router.get('/clubs', getClubs);
// router.get('/clubs/all', getAllClubs);
router.get('/townhalls/:idTH/clubs/:id', getClubById);
router.get('/clubs/:id', getClubById);
router.put('/townhalls/:idTH/clubs/:id', [BodyNotEmptyValidator, clubValidator, updateClub]);
router.put('/clubs/:id', [BodyNotEmptyValidator, clubValidator, updateClub]);
router.delete('/townhalls/:idTH/clubs/:id', deleteClub);
router.delete('/clubs/:id', deleteClub);


export default {
    routes: router
}