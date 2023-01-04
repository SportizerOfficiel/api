import { FirebaseService } from "../config/firebase.js";
import Player from "../models/player.model.js";
import admin from "firebase-admin"

const firebaseService = FirebaseService
const firestore = firebaseService.getInstance().db


export const addPlayer = async (player) => {
    let returnValue
    try {
        if (player.matchsPlayed === undefined) {
            player.matchsPlayed = []
        }
        const query = firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter).doc()
        player.id = query.id
        const playerAdd = await query.set(player)
        const playerSnapshot = await firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter).doc(query.id).get()
        returnValue = playerSnapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getPlayers = async (filter) => {
    let returnValue = []
    try {
        let query
        query = firestore.collection(firebaseService.playersNode).withConverter(Player.playerConverter)
        if (filter !== undefined && Object.keys(filter).length > 0) {
            Object.keys(filter).map(key => {
                query = query.where(key, "==", filter[key])
            })
        }           
        const snapshot = await query.get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getPlayerById = async (idPlayer) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).get();
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updatePlayer = async (idPlayer, player) => {
    let returnValue
    try {
        const matchsPlayed = player.matchsPlayed
        delete player.matchsPlayed
        const playerUpdate = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).set({matchsPlayed: admin.firestore.FieldValue.arrayUnion(matchsPlayed)}, { merge: true })
        const playerSnapshot = await firestore.collection(firebaseService.playersNode).doc(idPlayer).withConverter(Player.playerConverter).get()
        returnValue = playerSnapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const deletePlayer = async (idPlayer) => {
    try {
        const playerDelete = await firestore.collection(firebaseService.playersNode).doc(idPlayer).delete()
        return `player ${idPlayer} deleted`
    } catch (error) {
        throw error
    }
}