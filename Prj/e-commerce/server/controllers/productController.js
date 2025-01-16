const Product = require('../models/product')
module.exports.createProduct = (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Product data is missing or incomplete' });
    }
    Product.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Product created', productId: result.insertId });
    });
}
module.exports.getAllProducts = (req, res) =>{
    Product.findAll((err, results) =>{
        if (err) return res.status(500).json({error: err})
        res.status(200).json(results)
    })
}
module.exports.getProductById = (req, res) =>{
    const id = req.params.id
    Product.findById(id, (err, result) =>{
        if (err) return res.status(500).json({error: err})
        if (!result.length) return res.status(404).json({message: 'Product not found' })
        res.status(200).json(result[0])
    })
}
module.exports.updateProduct = (req, res) => {
    const id =req.params.id
    Product.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({error: err})
        res.status(200).json({ message: 'Product updated' })
    })
}
module.exports.deleteProduct = (req, res) => {
    const id =req.params.id
    Product.delete(id, (err, result) => {
        if (err) return res.status(500).json({error:err})
        res.status(200).json({ message: 'Product deleted' })
    })
}