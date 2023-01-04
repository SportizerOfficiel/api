import { FirebaseService } from "../config/firebase.js";
import PresentPlayer from "../models/presentPlayer.model.js";

const firebaseService = FirebaseService
const firestore = firebaseService.getInstance().db


export const addPresentPlayer = async (sport, category, idMatch, idPlayer, player) => {
    try {
        const presentPlayerAdd = await firestore.collection(firebaseService.matchsNode).doc(sport).collection(category).doc(idMatch).collection(firebaseService.presentPlayersNode).doc(idPlayer).withConverter(PresentPlayer.playerConverter).set(player)
        return presentPlayerAdd
    } catch (error) {
        throw error
    }
}

export const getPresentPlayers = async (sport, category, idMatch) => {
    let returnValue = []
    try {
        const snapshot = await firestore.collection(firebaseService.matchsNode).doc(sport).collection(category).doc(idMatch).collection(firebaseService.presentPlayersNode).withConverter(PresentPlayer.playerConverter).get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getPresentPlayerById = async (sport, category, idMatch, idPlayer) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.matchsNode).doc(sport).collection(category).doc(idMatch).collection(firebaseService.presentPlayersNode).doc(idPlayer).withConverter(PresentPlayer.playerConverter).get()
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updatePresentPlayer = async (sport, category, idMatch, idPlayer, player) => {
    try {
        const presentPlayerUpdate = await firestore.collection(firebaseService.matchsNode).doc(sport).collection(category).doc(idMatch).collection(firebaseService.presentPlayersNode).doc(idPlayer).withConverter(PresentPlayer.playerConverter).set(player, { merge: true })
        return presentPlayerUpdate
    } catch (error) {
        throw error
    }
}

export const deletePresentPlayer = async (sport, category, idMatch, idPlayer) => {
    try {
        const presentPlayerDelete = await firestore.collection(firebaseService.matchsNode).doc(sport).collection(category).doc(idMatch).collection(firebaseService.presentPlayersNode).doc(idPlayer).delete()
        return presentPlayerDelete
    } catch (error) {
        throw error
    }
}