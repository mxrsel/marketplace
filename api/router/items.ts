import express from 'express';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middlewate/auth';
import { imagesUpload } from '../multer';
import { ItemMutation } from '../types';
import Category from '../models/Category';

export const itemsRouter = express.Router();

itemsRouter.get('/', async(_req, res, next) => {
  try {
    const items = await Item.find().populate('category', 'title');
    res.status(200).send(items);
  } catch(e) {
    res.status(500).send({message: '500 Server error'});
    next(e)
  }
});

itemsRouter.post('/', imagesUpload.single('imageUrl'), auth, async(req, res, next) => {
  try {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if(!user) {
      res.status(400).send({message: 'Please pass authorization! '});
      return
    }

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) res.status(404).send('Not Found category');
    }

    const addItem: ItemMutation  = {
      user: user._id.toString(),
      category: req.body.category,
      title: req.body.title.toString(),
      description: req.body.description.toString(),
      imageUrl: req.file ? `/${req.file.filename}` : null,
      price: Number(req.body.price)
    }

    const newItem = new Item(addItem);

     await newItem.save();

    res.status(200).send(addItem);
  }catch(e){
    res.status(500).send({message: '500 Server error'});
    next(e)
  }
});

itemsRouter.get('/:id', async(req, res, next) => {
  if(!req.params.id) res.status(404).send('Not found!');

  try {
    res.send(await Item.findById(req.params.id).populate('category', 'title'));
  } catch(e) {
    next(e)
  }
});

itemsRouter.get('/category/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const items = await Item.find({ category: categoryId });
    if (!items.length) {
      res.status(404).send({ message: 'Items not found for this category' });
      return
    }
    res.status(200).send(items);
  } catch (e) {
    next(e)
  }
});

itemsRouter.delete('/:id', auth, async(req, res, next) => {
  try {
    const {id} = req.params;
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if(!user) {
      res.status(403).send({message: 'Yoy can not delete item '});
      return
    }

    const deletingItem = Item.findById(id);

    if(!deletingItem) {
      res.status(400).send({message: 'Post not found'});
      return
    }

    await Item.findByIdAndDelete(id);

    res.status(200).send({message: 'Item was successfully deleted'})
  } catch(e) {
    res.status(500).send({message: '500 Server error'});
    next(e)
  }
})