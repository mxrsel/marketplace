import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

export const Category = mongoose.model('Category', CategorySchema);
export default Category;