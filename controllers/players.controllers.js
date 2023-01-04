import Player from "../models/player.model.js";
import * as playerServices from '../services/players.services.js'


export const addPlayer = async (req, res) => {
    try {
        let dataToAdd = req.body
        // const idTH = req.get("idTH")
        // const idClub = req.get("idClub")
        const player = new Player(undefined, dataToAdd.idTH, dataToAdd.idClub, dataToAdd.lastName, dataToAdd.firstName, new Date(dataToAdd.birthDate), dataToAdd.category, dataToAdd.matchs, new Date(), new Date())
        const playerAdded = await playerServices.addPlayer(player)
        res.status(200).send(playerAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPlayers = async (req, res) => {
    try {
        // let idTH = req.get("idTH")
        // let idClub = req.get("idClub")
        // const idPlayer = req.params.id
        const filter = !!req.query.filter ? JSON.parse(req.query.filter) : undefined
        const players = await playerServices.getPlayers(filter)
        res.status(200).send(players);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getPlayerById = async (req, res) => {
    try {
        const idPlayer = req.params.id
        const player = await playerServices.getPlayerById(idPlayer)
        res.status(200).send(player);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updatePlayer = async (req, res) => {
    try {
        let dataToUpdate = req.body
        // const idTH = req.get("idTH")
        // const idClub = req.get("idClub")
        const idPlayer = req.params.id
        const player = new Player(undefined, dataToUpdate.idTH, dataToUpdate.idClub, dataToUpdate.lastName, dataToUpdate.firstName, new Date(dataToUpdate.birthDate), dataToUpdate.category, dataToUpdate.matchsPlayed, undefined, new Date())
        const playerUpdated = await playerServices.updatePlayer(idPlayer, player)
        res.status(200).send(playerUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deletePlayer = async (req, res) => {
    try {
        // const idTH = req.get("idTH")
        // const idClub = req.get("idClub")
        const idPlayer = req.params.id
        const playerDeleted = await playerServices.deletePlayer(idPlayer)
        res.status(200).send(playerDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}