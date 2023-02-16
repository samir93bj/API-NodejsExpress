const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

// Require services
const UserService = require('../services/user.service')
const CategoryService = require('../services/category.service')
const ProductService = require('../services/product.service')
const CustomerService = require('../services/customer.service')

class loadMassiveService {
  async createRegisters (file) {
    return file
  }

  // UPLOAD FILE TO SERVER
  async uploadService (file, nameFile, folder = '') {
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameFile)

    file.mv(uploadPath)

    return uploadPath
  }

  // DELETE FILE DUPLICATE
  async deleteFile (collection, nameFile) {
    // Hay q borar la imagen del server
    const pathFile = path.join(__dirname, '../uploads', collection, nameFile)

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile)
    }
  }

  // UPLOAD FILE PUT
  async uploadServicePut (collection, file, nameFile) {
    let service

    // SWITCH COLLECTIONS
    switch (collection) {
      case 'users':
        service = new UserService()
        break

      case 'customers':
        service = new CustomerService()
        break

      case 'categories':
        service = new CategoryService()
        break

      case 'products':
        service = new ProductService()
        break
    }

    const uploadPath = await this.uploadService(file, nameFile, collection)
    const data = await this.transformDataJson(uploadPath)

    service.bulkCreate(data)

    await this.deleteFile(collection, nameFile)

    return data
  }

  // Trasnform DATA xlsx to JSON
  async transformDataJson (path) {
    const workbook = XLSX.readFile(path)
    const workbookSheets = workbook.SheetNames

    const sheet = workbookSheets[0]
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])

    return dataExcel
  }
}

module.exports = loadMassiveService
