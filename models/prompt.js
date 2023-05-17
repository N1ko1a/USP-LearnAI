const mongoose = require('mongoose')

var PromptSchema = mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
    prompt: {type: String, required: true},
    conversation_id: {type: Number, required: true}
})

var PromptModel = mongoose.model('prompt', PromptSchema)

PromptModel.savePrompt = function (prompt){
    var newPrompt = new PromptModel({
        user_id: prompt.user_id,
        prompt: prompt.prompt,
        conversation_id: prompt.conversation_id
    });
    newPrompt.save();
    return newPrompt;
}


module.exports = PromptModel
