/* eslint-disable camelcase */
const path = require('path')
const fs = require('fs')

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

// Require services
const UserService = require('../services/user.service')
const CategoryService = require('../services/category.service')
const ProductService = require('../services/product.service')

// initialization services
const serviceUser = new UserService()
const categoryService = new CategoryService()
const productService = new ProductService()

class uploadService {
  // UPLOAD FILE TO SERVER
  async uploadService (file, nameFile, folder = '') {
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameFile)

    file.mv(uploadPath)

    return nameFile
  }

  // DELETE FILE DUPLICATE
  async deleteFileDuplicate (collection, nameImg) {
    // Hay q borar la imagen del server
    const pathImagen = path.join(__dirname, '../uploads', collection, nameImg)

    // Si la imagen existe la va a borrar
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen)
    }
  }

  // DELETE FILE CLOUDINARY
  async deleteFileDuplicateCloudinary (nameFile) {
    const nombreArr = nameFile.split('/')
    const nombre = nombreArr[nombreArr.length - 1]
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy(public_id)
  }

  // UPLOAD FILE PUT
  async uploadServicePut (id, collection, file, nameFile) {
    let model

    // SWITCH COLLECTIONS
    switch (collection) {
      case 'users':
        model = await serviceUser.findOne(id)
        break

      case 'categories':

        model = await categoryService.findOne(id)
        break

      case 'products':
        model = await productService.findOne(id)
        break
    }

    // VERIFY FILE EXIST
    if (model.image) {
      await this.deleteFileDuplicate(collection, model.image)
    }

    const fileName = await this.uploadService(file, nameFile, collection)
    model.image = fileName

    await model.save()

    return model
  }

  // UPLOAD FILE TO CLOUDINARY SERVER
  async uploadCloudinaryService (id, collection, file) {
    let model

    switch (collection) {
      case 'users':
        model = await serviceUser.findOne(id)
        break

      case 'categories':
        model = await categoryService.findOne(id)
        break

      case 'products':
        model = await productService.findOne(id)
        break
    }

    // VERIFY FILE EXIST
    if (model.image) {
      await this.deleteFileDuplicateCloudinary(model.image)
    }

    const { tempFilePath } = file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.image = secure_url

    await model.save()

    return model
  }
}
module.exports = uploadService
