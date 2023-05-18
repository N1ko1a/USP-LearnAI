var PromptModel = require('../models/prompt')


var find = function()
{
    return PromptModel.find()
}

var findById = function(id)
{
    return PromptModel.findById(id)
}

var findByUserId = function(user_id)
{
    return PromptModel.findByUserId(user_id)
}

var save = function(prompt)
{
    return PromptModel.savePrompt(prompt);
}

module.exports = {
    find,
    findById,
    findByUserId,
    save
}