import { getDB } from '../../config/mongodb.js';
import ApplicationError from '../../errorHandler/applicationError.js';

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static getAll() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.in',
    password: 'noob',
    type: 'seller',
  },
  {
    id: 2,
    name: 'Customer User',
    email: 'custom@ecom.in',
    password: 'noob',
    type: 'customer',
  },
];
