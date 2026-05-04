import BaseController from './baseController.js';
import User from '../Models/user.js';

class UserController extends BaseController {

  // Public method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      this.success(res, "Users retrieved", users);
    } catch (error) {
      this.error(res, error.message, 500); 
    }
  }

  // Public method to get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.get(id);
      
      if (!user) {
        return this.error(res, 'User not found', 404);
      }
      
      this.success(res, "User retrieved", user);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to create a user
  async createUser(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return this.error(res, 'Name is required', 400);
      }
      
      const user = await User.create({ name });
      this.success(res, "User created", user, 201);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      const user = await User.update(id, { name });
      
      if (!user) {
        return this.error(res, 'User not found', 404);
      }
      
      this.success(res, "User updated", user);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await User.delete(id);
      
      if (!isDeleted) {
        return this.error(res, 'User not found', 404);
      }
      
      this.success(res, 'User deleted successfully', { id });
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }
}

export default UserController;
