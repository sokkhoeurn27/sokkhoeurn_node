const db = require('../config/db');

class User {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  // Static method to get all users
  static async getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Static method to get user by ID
  static async getUserById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0] || null);
        }
      );
    });
  }

  // Static method to create a user
  static async createUser({ name }) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (name) VALUES (?)',
        [name],
        (err, result) => {
          if (err) reject(err);
          else resolve({
            id: result.insertId,
            name
          });
        }
      );
    });
  }

  // Static method to update a user
  static async updateUser(id, { name }) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, id],
        (err, result) => {
          if (err) reject(err);
          else if (result.affectedRows === 0) resolve(null);
          else resolve({ id, name });
        }
      );
    });
  }

  // Static method to delete a user
  static async deleteUser(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM users WHERE id = ?',
        [id],
        (err, result) => {
          if (err) reject(err);
          else if (result.affectedRows === 0) resolve(false);
          else resolve(true);
        }
      );
    });
  }
}

module.exports = User;
