import ApplicationError from '../../errorHandler/applicationError.js';
import UserModel from '../user/user.model.js';

export default class ProductModel {
  constructor(name, desc, imageUrl, category, price, size, id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.size = size;
  }

  static get(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = products.lenght + 1;
    products.push(product);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });
    return result;
  }

  static rateProduct(userID, productID, rating) {
    // 1. Validate user and product
    const user = UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      // user-defined error.
      throw new ApplicationError('User Not Found', 404);
    }

    // Validate Product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError('Product Not Found', 400);
    }

    // 2. Check if there are any ratings and if not then add ratings array.
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, rating: rating });
    } else {
      // 3. Check if user rating is already available.
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userID == userID
      );
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      } else {
        // 4. if no existing rating, then add new rating
        product.ratings.push({ userID: userID, rating: rating });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Kids',
    19.99
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Boys',
    29.99,
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Girls',
    39.99,
    ['M', 'XL', 'S']
  ),
];
