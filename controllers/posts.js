
function index(req, res) {

    
    console.log("index");
    res.end("funzione index")
}

function show(req, res) {


    res.end("funzione show")
    console.log("show");
}

function store(req, res) {


    res.end("funzione store")
    console.log("store");
}

function update(req, res) {


    res.end("funzione update")
    console.log("update");
}

function destroy(req, res) {


    res.end("funzione destroy")
    console.log("destroy");
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}