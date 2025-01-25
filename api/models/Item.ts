import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
title: {
  type: String,
  required: [true, 'Title is required'],
},
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  imageUrl: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
  }
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;