const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequalize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){

    const limit = 100;

    for(var i=0; i<limit ;i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      }) }


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

    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);

    return data;
  }

  //GET PRODUCT
  async findOne(id){
    const product = this.products.find(item => item.id === id);

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
