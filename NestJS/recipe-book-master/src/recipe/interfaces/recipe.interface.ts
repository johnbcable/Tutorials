import { Document } from 'mongoose';

export interface Recipe extends Document {
  title: String,
  description: String,
  category: String,
  ingredients: Array<string>,
  instructions: String,
}