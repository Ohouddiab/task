const jwt =require("jsonwebtoken")

const validate = token =>{
    var decoded = jwt.verify(token, 'GHKilmNUOPDA');
    console.log("STEP 101")
    if (decoded.exp < Date.now()) {
        let result ={}
        result.valid = true;
        result.decoded = decoded;
        return result;
      }else {
          throw "invalid"
      }


  }
  const auth = context =>{
      validate(context.params.headers["authorization"])

  }
  
  module.exports = auth;