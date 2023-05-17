var AnswerModel = require('../models/answer')


var find = function()
{
    return AnswerModel.find()
}

var findById = function(id)
{
    return AnswerModel.findById(id)
}

var save = function(answer)
{
    return AnswerModel.savePrompt(answer);
}

module.exports = {
    find,
    findById,
    save
}