var AnswerModel = require('../models/answer')


var find = function()
{
    return AnswerModel.find()
}

var findById = function(id)
{
    return AnswerModel.findById(id)
}

var findByPromptId = function(prompt_id)
{
    return AnswerModel.findByPromptId(prompt_id)
}

var findByUserId = function(user_id)
{
    return AnswerModel.findByUserId(user_id)
}

var save = function(answer)
{
    return AnswerModel.saveAnswer(answer);
}

module.exports = {
    find,
    findById,
    findByPromptId,
    findByUserId,
    save
}