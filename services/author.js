const AuthorModel = require('../models/author')


const find = function()
{
    return AuthorModel.find().populate("books");
}

const findById = function(id)
{
    return AuthorModel.findById(id).populate('books')
}

const update = async function(a)
{
    
    const author = await AuthorModel.updateAuthor(a)
    
    return author
}

const deleteById = async function(id)
{
    return AuthorModel.deleteById(id)
}


const save = function(author)
{
    return AuthorModel.saveAuthor(author);
}

module.exports = {
    find,
    findById,
    update,
    deleteById,
    save
}