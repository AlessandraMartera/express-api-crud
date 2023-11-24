module.exports = function (req, res, next){
    next(new Error(res.status(500).end("route not found")));
}