const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate();
  }

generate(){

  const limit = 20;

  for(var i=0; i<limit; i++){
    this.categories.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean()
    });
  }
}

//GET CATEGORIES
async find(){

  return this.categories;

}

//GET CATEGORY
async findOne(id){

  const category = await this.categories.find(item => item.id === id);

  if(!category){
    throw boom.notFound('Category not found');
  }

  if(category.isBlock){
    throw boom.conflict('Category is block');
  }

  return category;

}

//CREATE CATEGORY
async create(data){

  const newCategory = {
      id : faker.datatype.uuid(),
      ...data,
      isBlock: false
  };

  this.categories.push(newCategory);

  return newCategory;
}

//UPDATE CATEGORY
async update(data, id){

    const index = this.categories.findIndex(item => item.id === id );

    if(index === -1){
      throw boom.notFound('Category not found');
    }

    if(data.id){
      throw boom.conflict('You cannot update the id');
    };

    const product = this.categories[index];
    this.categories[index] = {
        ...product,
        ...data
      }

    return this.categories[index];

}

//DELETE CATEGORY
async detele(id){
  const index = this.categories.findIndex(item => item.id === id);

  if(index === -1){

    throw boom.notFound('Category not found');
  }

  this.categories.splice(index,1);
  return { id };
}

}

module.exports = CategoriesService;
