const { models }  = require('../libs/sequalize');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor(){

  }

generate(){

}

//GET CATEGORIES
async find(){

  const categories = await models.Category.findAll();
  return categories;
}

//GET CATEGORY
async findOne(id){

  const category = await models.Category.findByPk(id);

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
