const mongoose = require('mongoose')

var AnswerSchema = mongoose.Schema({
    answer: {type: String, required: true},
    prompt_id: {type: mongoose.Schema.Types.ObjectId, ref:"prompt", unique: true}
})

var AnswerModel = mongoose.model('answer', AnswerSchema)

AnswerModel.saveAnswer = function (answer){
    var newAnswer = new AnswerModel({
        answer: answer.answer,
        prompt_id: answer.prompt_id
    });
    newAnswer.save();
    return newAnswer;
}

AnswerModel.findByPromptId = function (prompt_id) {
    var ObjectId = mongoose.Types.ObjectId;
    return AnswerModel.find({ prompt_id: new ObjectId(prompt_id) }, { answer: 1, _id: 0}).exec();
};

module.exports = AnswerModel
