import express from 'express';
import Category from '../models/Category';

export const categoryRouter = express.Router();

categoryRouter.get('/', async(req, res, next) => {
  try{
    const category = await Category.find();
    if(!category) {
      res.status(400).send({message: 'Category is not found'});
    }
    res.status(200).send(category);
  } catch (e) {
   next(e)
  }
});

categoryRouter.get('/navigate', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    next(e);
  }
});