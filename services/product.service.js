const boom = require('@hapi/boom');
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

    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
      isBlock: false
    }

    this.products.push(newProduct);
    return newProduct;
  }

  //GET PRODUCTS
  async find(){

    const products = await models.Product.findAll();

    return products;
  }

  //GET PRODUCT
  async findOne(id){
    const product = await models.Product.findByPk(id);

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

      const index = this.products.findIndex(item => item.id === id);

      if(index === -1){
        //throw new Error('Product not found');
        throw boom.notFound('Product not found');
      }

      if(data.id){
        //throw new Error('You cannot update the id');
        throw boom.notFound('You cannot update the id');
      };

      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...data
      }

      return this.products[index];
  }

  //DELETE PRODUCT
  async delete(id){
    const index = this.products.findIndex(item => item.id === id);

    if(index === -1){
      //throw new Error('Product not found');
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);

    return  id ;
  }
}

module.exports = ProductsService;
