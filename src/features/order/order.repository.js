import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';

export default class OrderRepository {
  constructor() {
    this.collection = 'orders';
  }

  async placeOrder(userId) {
    // 1. Get cardItems and calculate totalAmount.
    await this.getTotalAmount(userId);
    // 2. Create an order record.
    // 3. Reduce the stock.
    // 4. Clear the card items.
  }

  async getTotalAmount(userId) {
    const db = getDB();
    const items = await db
      .collection('cartItems')
      .aggregate([
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
      ])
      .toArray();
    const finalTotalAmount = items.reduce(
      (acc, item) => acc + item.totalAmount
    );
    console.log(finalTotalAmount);
  }
}
