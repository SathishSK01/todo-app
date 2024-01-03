const {errorcode} = require("../errorcode");
const errorHandling = (req,res,err,next) =>{
    const statuscode = res.statuscode ? res.statuscode:500;
    switch(statuscode){
        case errorcode.VALIDATION_ERROR:
        res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
        break;
        
        case errorcode.UNAUTHROZIED:
        res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
        break;

        default:
        console.log("Success");
        break;
    }   
};

module.exports = errorHandling;