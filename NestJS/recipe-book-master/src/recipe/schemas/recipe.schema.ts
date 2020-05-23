import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    ingredients: Array,
    instructions: String,
})

