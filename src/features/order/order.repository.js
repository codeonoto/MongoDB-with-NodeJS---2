import { ObjectId } from 'mongodb';
import { getClient, getDB } from '../../config/mongodb.js';
import OrderModel from './order.model.js';
import ApplicationError from '../../errorHandler/applicationError.js';

export default class OrderRepository {
  constructor() {
    this.collection = 'orders';
  }

  async placeOrder(userId) {
    try {
      const client = getClient();
      const session = client.startSession();
      const db = getDB();
      session.startTransaction();
      // 1. Get cardItems and calculate totalAmount.
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount
      );
      console.log(finalTotalAmount);

      // 2. Create an order record.
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, session);

      // 3. Reduce the stock.
      for (let item of items) {
        await db
          .collection('products')
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.qunatity } },
            { session }
          );
      }

      // 4. Clear the card items.
      await db.collection('cartItems').deleteMany(
        {
          userId: new ObjectId(userId),
        },
        { session }
      );

      return;
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  async getTotalAmount(userId, session) {
    const db = getDB();
    const items = await db
      .collection('cartItems')
      .aggregate(
        [
          // 1. Get cart items for the user
          {
            $match: { userID: new ObjectId(userId) },
          },
          // 2. Get the products from products collections
          {
            $lookup: {
              from: 'products',
              localField: 'productID',
              foreignField: '_id',
              as: 'productInfo',
            },
          },
          // 3. Unwind the productInfo
          {
            $unwind: '$productInfo',
          },
          // 4. Calculate totalAmount for each cartItems.
          {
            $addFields: {
              totalAmount: {
                $multiply: ['$productInfo.price', '$quantity'],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    return items;
  }
}
