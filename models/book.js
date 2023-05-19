const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    title: {type: String},
    yearOfPublication: {type: Number},
    author: { type: mongoose.Schema.Types.ObjectId, ref:"author"}
})

BookSchema.virtual('authorName').get(function (){
    return this.author.split(" ")[0];
})

const BookModel = mongoose.model('book',BookSchema)

BookModel.saveBook = function (book){
    const newBook = new BookModel({
        title: book.title,
        yearOfPublication: book.yearOfPublication,
        author: book.author
    });
    newBook.save().then(book=>{
        return AuthorModel.findOneAndUpdate(book.author, 
            {
                $push: {books: book._id}
            })
    });
    return newBook;
}

BookModel.updateBook = async function (b){
    const book = await BookModel.findById(b._id);
    
    book.title = b.title;
    book.yearOfPublication = b.yearOfPublication;
    // autor nije menjan, jer se gubi konzistentnost, tako da se menja samo title i yearOfPublication
    // book.author = b.author;


    book.save();

    return book;
}

BookModel.deleteById = async function(id)
{
    const status = await BookModel.findByIdAndDelete(id).then( async function(book){
        if (typeof book !== 'undefined' && book)
        {

            const author = await AuthorModel.findOneAndUpdate(book.author, {
                $pullAll: { books: [book._id.toString()] }
            })

            return true;
        }
        return false
    })

    return status;
}

module.exports = BookModel

const AuthorModel = require('./author')
