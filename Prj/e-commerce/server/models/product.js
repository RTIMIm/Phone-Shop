const db = require('../database-mysql/index')

class Product {
    static create(productData, callback) {
        const query = 'INSERT INTO products (name, description, price, stock, category_id, image) VALUES (?, ?, ?, ?, ?, ?)'
        db.query(query, [
            productData.name, 
            productData.description, 
            productData.price, 
            productData.stock, 
            productData.category_id,
            productData.image
        ], callback)
    }
    static findAll(callback) {
        const query = 'SELECT * FROM products'
        db.query(query, callback)
    }
    static findById(id, callback) {
        const query = 'SELECT * FROM products WHERE id = ?'
        db.query(query, [id], callback)
    }
    
    static update(id, productData, callback) {
        const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, image = ? WHERE id = ?'
        db.query(query, [
            productData.name, 
            productData.description, 
            productData.price, 
            productData.stock, 
            productData.category_id, 
            productData.image,
            id
        ], callback)
    }

    static delete(id, callback) {
        const query = 'DELETE FROM products WHERE id = ?'
        db.query(query, [id], callback)
    }
}

module.exports = Product