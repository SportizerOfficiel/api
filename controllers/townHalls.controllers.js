import TownHall from "../models/townHall.model.js";
import * as townHallServices from "../services/townHalls.services.js";

export const addTownHall = async (req, res) => {
    try {
        let dataToAdd = req.body
        const townhall = new TownHall(undefined, dataToAdd.name, dataToAdd.address, new Date(), new Date())
        const townhallAdded = await townHallServices.addTownHall(townhall)
        res.status(200).send(townhallAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getTownHalls = async (req, res) => {
    try {
        const townHalls = await townHallServices.getTownHalls()
        res.status(200).send(townHalls);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getTownHallById = async (req, res) => {
    try {
        const idTH = req.params.id
        const townHall = await townHallServices.getTownHallById(idTH)
        res.status(200).send(townHall);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateTownHall = async (req, res) => {
    try {
        let dataToUpdate = req.body
        const idTH = req.params.id
        const townhall = new TownHall(undefined, dataToUpdate.name, dataToUpdate.address, undefined, new Date())
        const townHall = await townHallServices.updateTownHall(idTH, townhall)
        res.status(200).send(townHall);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteTownHall = async (req, res) => {
    try {
        const idTH = req.params.id
        const townhallDeleted = await townHallServices.deleteTownHall(idTH)
        res.status(200).send(townhallDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}