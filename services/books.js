const BookModel = require('../models/book')


const find = function()
{
    return BookModel.find().populate('author');
}

const findById = function(id)
{
    return BookModel.findById(id).populate('author')
}

const save = function(book)
{
    return BookModel.saveBook(book);
}

const update = async function(b)
{
    
    const book = await BookModel.updateBook(b)
    
    return book
}

const deleteById = async function(id)
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