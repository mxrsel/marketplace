import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";


const run = async () => {
  await mongoose.connect(config.mongoDbPath);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
  } catch (e) {
    console.log('Collections were not presents, skipping drop ');
  }

 await Category.create(
    {
      title: 'Computers'
    },
    {
      title: 'Cars'
    },
    {
      title: 'Other'
    }

    );
  await db.close();
};

run().catch(console.error);