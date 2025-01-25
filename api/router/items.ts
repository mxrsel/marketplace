import express from 'express';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middlewate/auth';
import { imagesUpload } from '../multer';
import { ItemMutation } from '../types';

export const itemsRouter = express.Router();

itemsRouter.get('/', async(_req, res, next) => {
  try {
    const items = await Item.find().populate('category', '_id title');
    res.status(200).send(items);
  } catch(e) {
    res.status(500).send({message: '500 Server error'});
    next(e)
  }
});

itemsRouter.post('/', auth, imagesUpload.single('imageUrl'), async(req, res, next) => {
  try {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if(!user) {
      res.status(400).send({message: 'Please pass authorization! '});
      return
    }

    const addItem: ItemMutation  = {
      user: user._id.toString(),
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file ? `public/images/${req.file.filename}` : null,
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

itemsRouter.delete('/:id', auth, async(req, res, next) => {
  try {
    const {id} = req.params;
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    if(!user) {
      res.status(400).send({message: 'Please pass authorization! '});
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