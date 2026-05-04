import db from '../config/db.js';
import BaseModel from './BaseModel.js';

class Product extends BaseModel {
  constructor({ id, name, price, description }) {
    super({ id, name, price, description });
  }

  // Implement abstract methods
  static async get(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM products WHERE id = ?',
        [id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0] || null);
        }
      );
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
        [data.name, data.price, data.description],
        (err, result) => {
          if (err) reject(err);
          else resolve({
            id: result.insertId,
            name: data.name,
            price: data.price,
            description: data.description
          });
        }
      );
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        [data.name, data.price, data.description, id],
        (err, result) => {
          if (err) reject(err);
          else if (result.affectedRows === 0) resolve(null);
          else resolve({ id, name: data.name, price: data.price, description: data.description });
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM products WHERE id = ?',
        [id],
        (err, result) => {
          if (err) reject(err);
          else if (result.affectedRows === 0) resolve(false);
          else resolve(true);
        }
      );
    });
  }

  static async find(query = {}) {
    // For simplicity, find all products if no query
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

export default Product;