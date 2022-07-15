const express = require('express');
const CategoriesService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {  createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema');
const router = express.Router();
const service = new CategoriesService();

//GET USERS
router.get('/',

  async (req, res,next) => {
    try {
      const categories = await service.find();

      res.status(200).json({
        message: "Categories List",
        categories,
      });
    }catch (err){
      next(err)
    }
  })

//GET CATEGORY
router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try{
      const id = req.params.id;
      const category = await service.findOne(id);

      res.status(200).json({
        category
      });

    }catch(err){
      next(err);
    }

})

//CREATE CATEGORY
router.post('/',
  validatorHandler(createCategorySchema,'body'),
  async(req,res,next)=> {

    try{
      const data = req.body;
      const category = await service.create(data);

      res.status(201).json({
        category
      });
    }
    catch(err){
      next(err);
    }
  }

);

//PATCH CATEGORY
router.patch('/:id',
  validatorHandler(getCategorySchema,'params'),
  validatorHandler(updateCategorySchema,'body'),
  async(req,res,next)=>{
    try{
      const data = req.body;
      const id  = req.params.id;
      const category = await service.update(data, id);

      res.status(201).json({
        message: "Category updated",
        category
      });

    }catch(err){
      next(err);
    }

  }
);

//DELETE CATEGORY
router.delete('/:id',
  validatorHandler(getCategorySchema,'params'),
  async(req,res,next) => {

    try{
        const id = req.params.id;
        const idCategory = await service.detele(id);

          res.status(200).json({
            message: "Category deleted succefully",
            idCategory
        });

    }catch(err){
      next(err);
    }

  }
);

module.exports = router;
