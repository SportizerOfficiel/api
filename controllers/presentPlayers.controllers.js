import PresentPlayer from "../models/presentPlayer.model.js";
import * as presentPlayersServices from "../services/presentPlayers.services.js";


export const addPresentPlayer = async (req, res) => {
    try {
        let dataToAdd = req.body
        const sport = req.get("sport")
        const category = req.get("category")
        const idMatch = req.get("idMatch")
        const idPlayer = req.get("idPlayer")
        const player = new PresentPlayer(idPlayer, dataToAdd.lastName, dataToAdd.firstName, dataToAdd.fouls, dataToAdd.points, dataToAdd.num, dataToAdd.category, dataToAdd.home, new Date(), new Date())
        const presentPlayerAdded = await presentPlayersServices.addPresentPlayer(sport, category, idMatch, idPlayer, player)
        res.status(200).send(presentPlayerAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPresentPlayers = async (req, res) => {
    try {
        let sport = req.get("sport")
        let category = req.get("category")
        let idMatch = req.get("idMatch")
        const presentPlayers = await presentPlayersServices.getPresentPlayers(sport, category, idMatch)
        res.status(200).send(presentPlayers);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPresentPlayerById = async (req, res) => {
    try {
        let sport = req.get("sport")
        let category = req.get("category")
        let idMatch = req.get("idMatch")
        const idPlayer = req.params.id
        const presentPlayer = await presentPlayersServices.getPresentPlayerById(sport, category, idMatch, idPlayer)
        res.status(200).send(presentPlayer);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updatePresentPlayer = async (req, res) => {
    try {
        let dataToUpdate = req.body
        let sport = req.get("sport")
        let category = req.get("category")
        let idMatch = req.get("idMatch")
        const idPlayer = req.params.id
        const player = new PresentPlayer(idPlayer, dataToUpdate.lastName, dataToUpdate.firstName, dataToUpdate.fouls, dataToUpdate.points, dataToUpdate.num, dataToUpdate.category, dataToUpdate.home, undefined, new Date())
        const presentPlayerUpdated = await presentPlayersServices.updatePresentPlayer(sport, category, idMatch, idPlayer, player)
        res.status(200).send(presentPlayerUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deletePresentPlayer = async (req, res) => {
    try {
        let sport = req.get("sport")
        let category = req.get("category")
        let idMatch = req.get("idMatch")
        const idPlayer = req.params.id
        const presentPlayerDeleted = await presentPlayersServices.deletePresentPlayer(sport, category, idMatch, idPlayer)
        res.status(200).send(presentPlayerDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}