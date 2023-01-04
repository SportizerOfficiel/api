import express from "express"
import { addTownHall, deleteTownHall, getTownHallById, getTownHalls, updateTownHall } from "../controllers/townHalls.controllers.js";
import { townHallValidator } from "../validators/townhalls.validators.js";
import { BodyNotEmptyValidator } from "../validators/common.validators.js";


const router = express.Router();
router.post('/townhalls', [BodyNotEmptyValidator, townHallValidator, addTownHall]  );
router.get('/townhalls', getTownHalls);
router.get('/townhalls/:id', getTownHallById);
router.put('/townhalls/:id', [BodyNotEmptyValidator, townHallValidator, updateTownHall]);
router.delete('/townhalls/:id', deleteTownHall);


export default {
    routes: router
}