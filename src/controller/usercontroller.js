const User = require('../Models/user');

class UserController {
  // Public method to get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Public method to get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.getUserById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Public method to create a user
  async createUser(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      
      const user = await User.createUser({ name });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Public method to update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      const user = await User.updateUser(id, { name });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Public method to delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await User.deleteUser(id);
      
      if (!isDeleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
