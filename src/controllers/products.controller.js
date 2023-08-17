import ProductsService from "../services/products.service.js";

const ps = new ProductsService();

export default class ProductsController {
    static async getProducts(req, res) {
        try {
            let filter = {};
            let sort = {};
    
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const category = req.query.category;
            const disponible = req.query.disponible;
            const sortOpt = req.query.sort;
    
            if (category) filter = { category };
            if (disponible === 'si') filter = { stock: { $gt: 0 } };
            if (disponible === 'no') filter = { stock: 0 };
            if (sortOpt === 'asc') sort = { price: 1 };
            if (sortOpt === 'desc') sort = { price: -1 };
    
            const catQuery = category ? `&category=${category}` : '';
            const productsData = await ps.getProducts(
                filter,
                sort,
                limit,
                page
            );
    
            const response = {
                status: 'success',
                payload: productsData.products,
                totalPages: productsData.totalPages,
                prevPage: productsData.prevPage,
                nextPage: productsData.nextPage,
                page: productsData.page,
                hasPrevPage: productsData.hasPrevPage,
                hasNextPage: productsData.hasNextPage,
            };
    
            if (productsData.hasPrevPage) {
                response.prevLink = `http://localhost:8080/api/products?limit=${limit}&page=${productsData.prevPage}&disponible=${disponible}&sort=${sortOpt}${catQuery}`;
            }
    
            if (productsData.hasNextPage) {
                response.nextLink = `http://localhost:8080/api/products?limit=${limit}&page=${productsData.nextPage}&disponible=${disponible}&sort=${sortOpt}${catQuery}`;
            }
    
            res.json(response);

        } catch (error) {
            res.status(500).json({ error: `Error al obtener los productos: ${error.message}` });
        }
    }

    static async getProductById(req, res) {
        const { pid } = req.params;
        try {
            const product = await ps.getProductById(pid);
            res.json({ status: 'success', payload: product });
        } catch (error) {
            res.status(404).json({ error: `Producto no encontrado: ${error.message}` });
        }
    }

    static async createProduct(req, res) {
        const productData = req.body;
        try {
            const result = await ps.createProduct(productData);
            res.status(201).json({ message: 'Producto Creado', payload: result });
        } catch (error) {
            res.status(500).json({ error: `Error al crear el producto: ${error.message}` });
        }
    }

    static async updateProduct(req, res) {
        const { pid } = req.params;
        const newProductData = req.body;
        try {
            const result = await ps.updateProduct(pid, newProductData);
            res.json({ message: 'Producto Actualizado', payload: result });
        } catch (error) {
            res.status(500).json({ error: `Error al actualizar el producto: ${error.message}` });
        }
    }

    static async deleteProduct(req, res) {
        const { pid } = req.params;
        try {
            const result = await ps.deleteProduct(pid);
            res.json({ message: 'Producto Eliminado', payload: result });
        } catch (error) {
            res.status(500).json({ error: `Error al eliminar el producto: ${error.message}` });
        }
    }
}
