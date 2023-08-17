import CartsService from '../services/carts.service.js';

const cs = new CartsService();

export default class CartsController {
  static async getAllCarts(req, res) {
    try {
      const carts = await cs.getAllCarts();
      res.json({ message: 'Success', payload: carts });
    } catch (error) {
      res.status(500).json({ error: `Error al buscar los carritos en la base de datos: ${error.message}` });
    }
  }

  static async getCartById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cs.getCartById(cid);
      res.status(200).json({ payload: cart });
    } catch (error) {
      res.status(500).json({ error: `Error al obtener el carrito: ${error.message}` });
    }
  }

  static async createCart(req, res) {
    try {
      const result = await cs.createCart();
      res.status(201).json({ message: 'Success', payload: result });
    } catch (error) {
      res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
    }
  }

  static async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const updatedCart = await cs.addProductToCart(cid, pid);
      res.status(200).json({ message: 'Producto agregado correctamente', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ error: `Error al agregar el producto al carrito: ${error.message}` });
    }
  }

  static async updateProductInCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const updatedCart = await cs.updateProductInCart(cid, pid, quantity);
      res.status(200).json({ message: 'Cantidad del producto actualizada correctamente', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ error: `Error al actualizar la cantidad del producto: ${error.message}` });
    }
  }

  static async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const updatedCart = await cs.deleteProductFromCart(cid, pid);
      res.status(200).json({ message: 'Producto eliminado correctamente', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ error: `Error al eliminar el producto del carrito: ${error.message}` });
    }
  }

  static async deleteCart(req, res) {
    const { cid } = req.params;
    try {
      const updatedCart = await cs.deleteCart(cid);
      res.status(200).json({ message: 'Todos los productos del carrito han sido eliminados', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ error: `Error al eliminar los productos del carrito: ${error.message}` });
    }
  }
}
