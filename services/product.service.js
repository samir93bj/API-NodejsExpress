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
