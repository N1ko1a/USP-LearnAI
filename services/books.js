var BookModel = require('../models/book')


var find = function()
{
    return BookModel.find().populate('author');
}

var findById = function(id)
{
    return BookModel.findById(id).populate('author')
}

var save = function(book)
{
    return BookModel.saveBook(book);
}

var update = async function(b)
{
    
    var book = await BookModel.updateBook(b)
    
    return book
}

var deleteById = async function(id)
{
    return BookModel.deleteById(id)
}

module.exports = {
    find,
    findById,
    update,
    deleteById,
    save
}