const path = require('path');
const { models }  = require('../libs/sequalize');


class uploadService{

  constructor(){

  }

 async uploadService(file ,nameFile, folder = ''){
    const uploadPath = path.join( __dirname , '../uploads/',folder, nameFile);

    file.mv(uploadPath);

    return nameFile;
 }

}
module.exports = uploadService;
