module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next()
    }
    try{
        const token = req.headers;
    }catch(e){

    }
}