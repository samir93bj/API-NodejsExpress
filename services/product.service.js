const boom = require('@hapi/boom');
const {Op} = require('sequelize');
const { models }  = require('../libs/sequalize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){


  }

  //CREATE PRODUCT
  async create(data){

    const product = await models.Product.create(data);
    return product;

  }

  //GET PRODUCTS
  async find(data){

    //ARRAY OPCIONES PARA FILTROS
    const options = {
      include:['category'],
      where: {}
    }

    //ALMACENAR DATOS DEL QUERY
    const { limit , offset }= data;
    if(limit , offset){
      options.limit = limit;
      options.offset = offset;
    }

    const { price }= data;
    if(price){
      options.where.price = price;
    }

    const {priceMin, priceMax} = data;

    if(priceMin,priceMax){
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      };
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  //GET PRODUCT
  async findOne(id){
    const product = await models.Product.findByPk(id, { include:['category'] });

    if(!product){
      throw boom.notFound('Product not found');
    }

    if(product.isBlock){
      throw boom.conflict('Product is block');
    }

    return product;
  }

  //UPDATE PRODUCT
  async update(id, data){

      const getProduct = await this.findOne(id);

      const productUp = await getProduct.update(data);

      return productUp;
  }

  //DELETE PRODUCT
  async delete(id){

    const getProduct = await this.findOne(id);

    await getProduct.destroy(id);

    return id ;
  }
}

module.exports = ProductsService;
