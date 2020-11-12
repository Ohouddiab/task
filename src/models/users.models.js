const { Timestamp } = require("mongodb");

module.exports=function(app){
    const mongooseClient = app.get('mongooseClient');
    const usres = new mongooseClient.Schema({

        email: {type: string , unique: true, lowercase: ture},
        password: {type: string},


    }, {timestamps: true
    });
    
    return mongooseClient.model('users', users);
}