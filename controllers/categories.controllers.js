import Category from "../models/category.model.js";
import * as categoriesServices from "../services/categories.services.js";


export const addCategory = async (req, res) => {
    try {
        let dataToAdd = req.body
        const category = new Category(dataToAdd.category, dataToAdd.sport, dataToAdd.parties, dataToAdd.partyTime, dataToAdd.halfTime, new Date(), new Date())
        const categoryAdded = await categoriesServices.addCategory(category)
        res.status(200).send(categoryAdded);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getCategories = async (req, res) => {
    try {
        let sport = req.get("sport")
        const categories = await categoriesServices.getCategories(sport)
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getCategoryById = async (req, res) => {
    try {
        let sport = req.get("sport")
        const idCategory = req.params.id
        const category = await categoriesServices.getCategoryById(sport, idCategory)
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const updateCategory = async (req, res) => {
    try {
        let dataToUpdate = req.body
        let sport = req.get("sport")
        const idCategory = req.params.id
        const category = new Category(undefined, dataToUpdate.sport, dataToUpdate.parties, dataToUpdate.partyTime, dataToUpdate.halfTime, undefined, new Date())
        const categoryUpdated = await categoriesServices.updateCategory(sport, idCategory, category)
        res.status(200).send(categoryUpdated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        let sport = req.get("sport")
        const idCategory = req.params.id
        const categoryDeleted = await categoriesServices.deleteCategory(sport, idCategory)
        res.status(200).send(categoryDeleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}