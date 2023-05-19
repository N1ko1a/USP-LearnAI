const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    dateOfBirth: { type: Number, required: true},
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book"
        }
    ]
})

const AuthorModel = mongoose.model('author',AuthorSchema)

AuthorModel.saveAuthor = function (author){

    const newAuthor = new AuthorModel({
        name: author.name,
        surname: author.surname,
        dateOfBirth: author.dateOfBirth
    });
    newAuthor.save();
    return newAuthor;
}

AuthorModel.updateAuthor = async function (a){
    const author = await AuthorModel.findById(a._id);

    author.name = a.name;
    author.surname = a.surname;
    author.dateOfBirth = a.dateOfBirth

    author.save();

    return author;
}

AuthorModel.deleteById = async function(id){
        
    const success = await AuthorModel.findOneAndDelete(id).then(async function(author){
        if (typeof author !== 'undefined' && author)
        {
            await BookModel.deleteMany({author: author._id})
            return true;
        }
        return false;
    });

    return success;

   
}

module.exports = AuthorModel

const BookModel = require('./book');