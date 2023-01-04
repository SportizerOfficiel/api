import { FirebaseService } from "../config/firebase.js";
import Club from "../models/club.model.js";

const firebaseService = FirebaseService
const firestore = firebaseService.getInstance().db

export const addClub = async (idTH, club) => {
    try {
        const query = firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).withConverter(Club.clubConverter).doc();
        club.id = query.id
        const clubAdd = await query.set(club)
        return clubAdd
    } catch (error) {
        throw error
    }
}

export const getClubs = async (idTH, filter) => {
    let returnValue = []
    try {
        let snapshot
        let query
        if (idTH != undefined) {
            query = firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).withConverter(Club.clubConverter)
        } else {
            query = firestore.collectionGroup(firebaseService.clubsNode).withConverter(Club.clubConverter)
        }
        if (filter !== undefined && Object.keys(filter).length > 0) {
            Object.keys(filter).map(key => {
                query = query.where(key, "==", filter[key])
            })
        }
        snapshot = await query.get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getClubById = async (idTH, idClub) => {
    let snapshot
    let returnValue
    try {
        if (idTH !== undefined) {
            snapshot = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).get();
            returnValue = snapshot.data()
        } else {
            snapshot = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).limit(1).withConverter(Club.clubConverter).get();
            snapshot.forEach(doc => {
                returnValue = doc.data()
            })
        }
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updateClub = async (idTH, idClub, club) => {
    try {
        let clubUpdate
        let returnValue
        if (idTH === undefined) {
            const getIdTH = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).withConverter(Club.clubConverter).get()
            getIdTH.forEach(doc => {
                idTH = doc.data().idTH
            })
        }

        clubUpdate = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).set(club, { merge: true });
        const snapshot = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).withConverter(Club.clubConverter).get()
        returnValue = snapshot.data()

        return returnValue
    } catch (error) {
        throw error
    }
}

export const deleteClub = async (idTH, idClub) => {
    let returnValue
    try {
        if (idTH === undefined) {
            const getIdTH = await firestore.collectionGroup(firebaseService.clubsNode).where("id", "==", idClub).withConverter(Club.clubConverter).get()
            getIdTH.forEach(doc => {
                idTH = doc.data().idTH
            })
        }
        const clubDelete = await firestore.collection(firebaseService.townHallsNode).doc(idTH).collection(firebaseService.clubsNode).doc(idClub).delete()
        returnValue = `CLub ${idClub} deleted`
        return returnValue
    } catch (error) {
        throw error
    }
}