var AuthorModel = require('../models/author')


var find = function()
{
    return AuthorModel.find().populate("books");
}

var findById = function(id)
{
    return AuthorModel.findById(id).populate('books')
}

var update = async function(a)
{
    
    var author = await AuthorModel.updateAuthor(a)
    
    return author
}

var deleteById = async function(id)
{
    return AuthorModel.deleteById(id)
}


var save = function(author)
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