module.exports = function ( err, req, res, next){
    console.log(err);
    res.status(500).end("ops... qualcosa è andato storto")
    next();
}