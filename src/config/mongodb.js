import { MongoClient } from 'mongodb';

let client;

export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log('MongoDB is connected');
      createCounter(client.db());
      createIndezes(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClient = () => {
  return client;
};

export const getDB = () => {
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection('counters')
    .findOne({ _id: 'cartItmeId' });
  if (!existingCounter) {
    await db.collection('counters').insertOne({ _id: 'cartItmeId', value: 0 });
  }
};

const createIndezes = async (db) => [
  await db.collection('products').createIndex({ price: 1 }),
  await db.collection('products').createIndex({ name: 1, category: -1 }),
  await db.collection('products').createIndex({ desc: 'text' }),
];
