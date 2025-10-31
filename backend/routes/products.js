const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try{
        const products = await Product.findAll();
        res.json(products);
    } catch (error){
        res.status(500).json({errro: 'Erro ao buscar produtos'});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product){
            return res.status(404).json({error: 'Produto não encontrado'});
        }
        res.json(product);
    } catch (error){
        res.status(500).json({error: 'Erro ao buscar produto'});
    }
});

router.get('/category/:category', async (req, res) => {
    try{
        const products = await Product.findAll({
            where: {category: req.params.category}
        });
        res.json(products);
    } catch (error){
        res.status(500).json({error: 'Erro ao buscar produtos por categoria'});
    }
});

module.exports = router;
