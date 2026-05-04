import BaseController from './baseController.js';
import Product from '../Models/product.js';

class ProductController extends BaseController {

  // Public method to get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      this.success(res, "Products retrieved", products);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to get product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.get(id);

      if (!product) {
        return this.error(res, 'Product not found', 404);
      }

      this.success(res, "Product retrieved", product);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to create a product
  async createProduct(req, res) {
    try {
      const { name, price, description } = req.body;

      if (!name || !price) {
        return this.error(res, 'Name and price are required', 400);
      }

      const product = await Product.create({ name, price, description });
      this.success(res, "Product created", product, 201);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to update a product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;

      const product = await Product.update(id, { name, price, description });

      if (!product) {
        return this.error(res, 'Product not found', 404);
      }

      this.success(res, "Product updated", product);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // Public method to delete a product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await Product.delete(id);

      if (!isDeleted) {
        return this.error(res, 'Product not found', 404);
      }

      this.success(res, 'Product deleted successfully', { id });
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }
}

export default ProductController;