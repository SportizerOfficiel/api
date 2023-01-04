import express from "express"
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories.controllers.js";



const router = express.Router();

router.post('/categories', addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


export default {
    routes: router
}