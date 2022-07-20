const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {  createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

//router
const router = express.Router();

//Servicios
const service = new ProductsService();

//GET PRODUCTS
router.get('/',async (req,res) => {
    const products = await service.find();

    return res.status(200).json({
      products
    });
});


//GET FILTER
router.get('/filter',(req, res) => {

    res.status(200).json({
      description: "Product Filter"
    });
});

//GET PRODUCT (ID)
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
    async (req, res,next) => {
      try{
        const id = req.params.id;
        const product = await service.findOne(id);

        res.status(200).json({
          product
        });
      }
      catch(error){
        next(error);
      }
});

//POST PRODUCT (ID)
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {

    try{
        const newProduct = await service.create(req.body);
        res.status(201).json({
          message:"Product Created",
          newProduct
        });
    }
    catch(error){
      res.status(404).json({
        message: error.message
      });
    }

});

//PATCH PRODUCT (ID)
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res,next) => {

  try{
      const id = req.params.id;
      const data = req.body;

      const product = await service.update(id, data);

      res.status(200).json({
        message: 'Update succefully',
        product
      });

  } catch(error){
    next(error);
  }

});

//DELETE PRODUCT
router.delete('/:id',
validatorHandler(getProductSchema, 'params'),

async (req,res,next) => {

  try{
    const id = req.params.id;
    const productDeleted = await service.delete(id);

      res.status(200).json({
        message:"Product Deleted",
        productDeleted
      });
    }catch(err){
      next(err);
    }

});



module.exports = router;



