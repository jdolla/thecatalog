const createError = require('http-errors');

const logError = (err, req, res, next) => {
    console.log(err);

    const status = (err.status) ? err.status : 500;
    const message = (err.message) ? err.message : "internal error";

    if(status === 500){
        return res.status(status).send();
    }
    return res.status(status).json({message});

}

module.exports = {
    logError
}