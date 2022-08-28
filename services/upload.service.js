const path = require('path');
const { models }  = require('../libs/sequalize');
const boom = require('@hapi/boom');
const fs = require('fs');

//Require services
const UserService = require('../services/user.service');
const CategoryService = require('../services/category.service');
const ProductService = require('../services/product.service');

//initialization services
const serviceUser = new UserService();
const categoryService = new CategoryService();
const productService = new ProductService();

class uploadService{

  constructor(){

  }

//UPLOAD FILE TO SERVER
 async uploadService(file ,nameFile, folder =''){

  const uploadPath = path.join( __dirname , '../uploads/',folder, nameFile);

    file.mv(uploadPath);

    return nameFile;
 }


//UPLOAD FILE PUT
async uploadServicePut(id,collection, file ,nameFile){
    let model;

    switch(collection){

      case 'users':
        model = await serviceUser.findOne(id);
      break;

      case 'categories':
        model = await categoryService.findOne(id);
      break;

      case 'products':
        model = await productService.findOne(id);
      break;
    }

    const fileName = await this.uploadService(file,nameFile, collection);
    return fileName;

}

 //UPLOAD FILE TO CLOUDINARY SERVER
async uploadCloudinaryService(id, collection){

  let model;

    switch(collection){

      case 'users':
        model = await serviceUser.findOne(id);
      break;

      case 'categories':
        model = await categoryService.findOne(id);
      break;

      case 'products':
        model = await productService.findOne(id);
      break;
    }



    return model;
 }

}
module.exports = uploadService;
