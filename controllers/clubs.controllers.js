import Club from "../models/club.model.js";
import * as clubsServices from "../services/clubs.services.js"


export const addClub = async (req, res) => {
    try {
        let dataToAdd = req.body
        let idTH
        if(req.params.idTH !== undefined || dataToAdd.idTH !== undefined) {
            idTH = req.params.idTH ? req.params.idTH : dataToAdd.idTH
        } else {
            throw new Error("Townhall undefined")
        }
        const club = new Club(undefined, idTH, dataToAdd.name, dataToAdd.sport, dataToAdd.address, new Date(), new Date())
        const clubAdded = await clubsServices.addClub(idTH, club)
        res.status(200).send(club);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getClubs = async (req, res) => {
    try {
        let idTH;
        const filter = !!req.query.filter ? JSON.parse(req.query.filter) : undefined
        if(req.params.idTH !== undefined) {
            idTH = req.params.idTH ? req.params.idTH : dataToAdd.idTH
        }
        const clubs = await clubsServices.getClubs(idTH, filter)
        res.status(200).send(clubs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getClubById = async (req, res) => {
    try {
        let idTH = req.params.idTH
        const idClub = req.params.id
        const club = await clubsServices.getClubById(idTH, idClub)
        res.status(200).send(club);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateClub = async (req, res) => {
    try {
        let  dataToUpdate = req.body
        const idClub = req.params.id
        const idTH = req.params.idTH
        const club = new Club(undefined, undefined, dataToUpdate.name, dataToUpdate.sport, dataToUpdate.address, undefined, new Date())
        const clubUpdated = await clubsServices.updateClub(idTH, idClub, club)
        res.status(200).send(clubUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteClub = async (req, res) => {
    try {
        let idTH = req.params.idTH
        const idClub = req.params.id
        const clubDeleted = await clubsServices.deleteClub(idTH, idClub)
        res.status(200).send(clubDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}