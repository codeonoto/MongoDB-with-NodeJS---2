import { MongoClient } from 'mongodb';

let client;

export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log('MongoDB is connected');
      createCounter(client.db());
    })
    .catch((err) => {
      console.log(err);
    });
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
