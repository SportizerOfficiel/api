import { FirebaseService } from "../config/firebase.js";
import Category from "../models/category.model.js";

const firebaseService = FirebaseService
const firestore = firebaseService.getInstance().db


export const addCategory = async (category) => {
    try {
        const categoryAdd = firestore.collection(firebaseService.disciplinesNode).doc(category.sport).collection(firebaseService.categoriesNode).withConverter(Category.categoryConverter).doc(category.id).set(category)
        return categoryAdd
    } catch (error) {
        throw error
    }
}

export const getCategories = async (sport) => {
    let returnValue = []
    try {
        const snapshot = await firestore.collection(firebaseService.disciplinesNode).doc(sport).collection(firebaseService.categoriesNode).withConverter(Category.categoryConverter).get()
        snapshot.forEach(doc => {
            returnValue.push(doc.data())
        });
        return returnValue
    } catch (error) {
        throw error
    }
}

export const getCategoryById = async (sport, idCategory) => {
    let returnValue
    try {
        const snapshot = await firestore.collection(firebaseService.disciplinesNode).doc(sport).collection(firebaseService.categoriesNode).doc(idCategory).withConverter(Category.categoryConverter).get()
        returnValue = snapshot.data()
        return returnValue
    } catch (error) {
        throw error
    }
}

export const updateCategory = async (sport, idCategory, category) => {
    try {
        const categoryUpdate = await firestore.collection(firebaseService.disciplinesNode).doc(sport).collection(firebaseService.categoriesNode).doc(idCategory).withConverter(Category.categoryConverter).set(category, { merge: true })
        return categoryUpdate
    } catch (error) {
        throw error
    }
}

export const deleteCategory = async (sport, idCategory) => {
    try {
        const categoryDelete = await firestore.collection(firebaseService.disciplinesNode).doc(sport).collection(firebaseService.categoriesNode).doc(idCategory).delete()
        return categoryDelete
    } catch (error) {
        throw error
    }
}