const { default: mongoose } = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: String
}, { timestamps: true });

CategorySchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Category = mongoose.model('category', CategorySchema);

module.exports = Category