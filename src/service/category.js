// CATEGORY SERVICE

const CategoryModel = require("../model/category");
const logger = require("../config/logger");

class CategoryService {
  /**
   * @description - THIS ENDPOINT IS USED TO CREATE CATEGORY
   * @param {object} data - THE DATA OBJECT
   * @returns - RETURNS AN OBJECT
   * @memberof CategoryService
   */

  static async createCategory(data) {
    const { name, icon, color } = data;

    const categoryExist = await CategoryModel.findOne({ name });

    if (categoryExist) {
      logger.error("category already exist");
      return {
        statusCode: 400,
        message: "category already exist",
      };
    }

    const createCat = new CategoryModel(data);

    await createCat.save();

    if (!createCat) {
      logger.error("category not created");
      return {
        statusCode: 500,
        message: "category not created",
      };
    } else {
      logger.info(
        `category created successfully : ${JSON.stringify(createCat)}`
      );

      return {
        statusCode: 200,
        message: "category created successfully",
        data: createCat,
      };
    }
  }
}

module.exports = CategoryService;
