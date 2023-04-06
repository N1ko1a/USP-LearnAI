var UserModel = require("../models/user")

var register = function(email, name, password)
{
    return UserModel.register(email, name, password);
}

module.exports = {
    register
}