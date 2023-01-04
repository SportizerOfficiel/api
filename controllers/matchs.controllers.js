import Match from "../models/match.model.js";
import * as matchsServices from "../services/matchs.services.js"



export const addMatch = async (req, res) => {
    try {
        let dataToAdd = req.body
        const sport = dataToAdd.sport
        const category = dataToAdd.category
        const match = new Match(undefined, dataToAdd.homeTeam, dataToAdd.awayTeam, new Date(dataToAdd.date), dataToAdd.place, dataToAdd.category, dataToAdd.sport, 0, 0, 0, 0, dataToAdd.duration, new Date(), new Date())
        const matchAdded = await matchsServices.addMatch(match)
        res.status(200).send(matchAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getMatchs = async (req, res) => {
    try {
        // const sport = req.get("sport")
        // const category = req.get("category")
        const filter = !!req.query.filter ? JSON.parse(req.query.filter) : undefined
        const matchs = await matchsServices.getMatchs(filter)
        res.status(200).send(matchs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getMatchById = async (req, res) => {
    try {
        // const sport = req.get("sport")
        // const category = req.get("category")
        const idMatch = req.params.id
        const match = await matchsServices.getMatchById(idMatch)
        res.status(200).send(match);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateMatch = async (req, res) => {
    try {
        var dataToUpdate = req.body
        const sport = req.get("sport")
        const category = req.get("category")
        const idMatch = req.params.id
        const match = new Match(undefined, dataToUpdate.homeTeam, dataToUpdate.awayTeam, new Date(dataToUpdate.date), dataToUpdate.place, dataToUpdate.category, dataToUpdate.sport, dataToUpdate.homePoints, dataToUpdate.awayPoints, dataToUpdate.homeFouls, dataToUpdate.awayFouls, dataToUpdate.duration, undefined, new Date())
        const matchUpdated = await matchsServices.updateMatch(idMatch, match)
        res.status(200).send(matchUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteMatch = async (req, res) => {
    try {
        // const sport = req.get("sport")
        // const category = req.get("category")
        const idMatch = req.params.id
        const matchDeleted = await matchsServices.deleteMatch(idMatch)
        res.status(200).send(matchDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}