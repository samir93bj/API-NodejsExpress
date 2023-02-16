const { models } = require('../libs/sequalize')
const boom = require('@hapi/boom')

class CategoriesService {
  generate () {

  }

  // GET CATEGORIES
  async find () {
    const categories = await models.Category.findAll({ include: ['product'] })
    return categories
  }

  // GET CATEGORY
  async findOne (id) {
    const category = await models.Category.findByPk(id, { include: ['product'] })

    if (!category) {
      throw boom.notFound('Category not found')
    }

    if (category.isBlock) {
      throw boom.conflict('Category is block')
    }

    return category
  }

  // CREATE CATEGORY
  async create (data) {
    const category = await models.Category.create(data)

    return category
  }

  // CRETE MASSIVE
  async bulkCreate (data) {
    const bulkData = await models.Category.bulkCreate(data)
    return bulkData
  }

  // UPDATE CATEGORY
  async update (data, id) {
    const getCategory = await this.findOne(id)
    const category = await getCategory.update(data)

    return category
  }

  // DELETE CATEGORY
  async detele (id) {
    const getCategory = await this.findOne(id)
    await getCategory.destroy()

    return { id }
  }
}

module.exports = CategoriesService
