const Product = require('../models/Product.js')
const aqp = require('api-query-params');

const gProducts = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page || queryString) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;

            result = await Product.find(filter)
                .skip(offset)
                .limit(limit)
                .populate('categories')
                .exec();
        } else {
            result = await Product.find({}).populate('categories');
        }
        return result;
    } catch (error) {
        return error;
    }
}

const gProduct = async (id) => {
    try {
        let result = await Product.findOne({ _id: id }).populate('categories');
        return result;
    } catch (error) {
        return error;
    }
}

const cProduct = async (data) => {
    try {
        let result = await Product.create(data);
        return result;
    } catch (error) {
        return error;
    }
}

const uProduct = async (data) => {
    try {
        let result = await Product.updateOne({ _id: data.id }, { ...data });
        return result
    } catch (error) {
        return error;
    }
}

const dProduct = async (id) => {
    try {
        let result = await Product.deleteById(id);
        return result
    } catch (error) {
        return error;
    }
}

module.exports = {
    gProduct, cProduct, uProduct, dProduct, gProducts
}