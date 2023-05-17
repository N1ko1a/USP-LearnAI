const mongoose = require('mongoose')

var AnswerSchema = mongoose.Schema({
    answer: {type: String, required: true},
    prompt_id: {type: mongoose.Schema.Types.ObjectId, ref:"prompt", unique: true}
})

var AnswerModel = mongoose.model('answer', AnswerSchema)

AnswerModel.savePrompt = function (answer){
    var newAnswer = new AnswerModel({
        answer: answer.answer,
        prompt_id: answer.prompt_id
    });
    return newAnswer;
}


module.exports = AnswerModel
