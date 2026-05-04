class BaseModel {
  constructor(data) {
    if (new.target === BaseModel) {
      throw new TypeError('Cannot instantiate abstract class BaseModel directly');
    }
    Object.assign(this, data);
  }

  // Abstract static methods
  static async get(id) {
    throw new Error('Method "get" must be implemented by subclass');
  }

  static async create(data) {
    throw new Error('Method "create" must be implemented by subclass');
  }

  static async update(id, data) {
    throw new Error('Method "update" must be implemented by subclass');
  }

  static async delete(id) {
    throw new Error('Method "delete" must be implemented by subclass');
  }

  static async find(query) {
    throw new Error('Method "find" must be implemented by subclass');
  }
}

export default BaseModel;