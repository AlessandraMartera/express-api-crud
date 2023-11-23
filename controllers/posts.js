const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const createSlug = require("../utilities/creatSlug")

async function index(req, res) {

    const data = await prisma.post.findMany()
    .then()
    .catch()

    console.log("index");
    res.json(data)
}

async function show(req, res) {
    const { id } = req.params;
    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }}
    )
    .then()
    .catch()

    if(!data){
        res.status(404).end("Not Found")
    } else{
        res.json(data)
    }

    
    console.log("show");
}

async function store(req, res) {

    const newPost = req.body;

    const slug = createSlug(newPost.title);

    const data = await prisma.post.create({
        data:{
            "title": newPost.title,  
            "slug": slug,   
            "image": newPost.image,  
            "content": newPost.content,
            "published": newPost.published
        }
    })

    res.json(data)
    console.log("store");
}

async function update(req, res) {
    const { id } = req.params;
    const newPost = req.body;
    const data = await prisma.post.update({
        where:{
            id: parseInt(id)
        },
        data:{
            "title": newPost.title,  
            "slug": newPost.slug,   
            "image": newPost.image,  
            "content": newPost.content,
            "published": newPost.published
        }
    })
    .then()
    .catch(err => console.log(err))

    res.json(data).send(`il post numero ${id} è stato aggiornato con successo`)
    console.log("update");
}

async function destroy(req, res) {

    const { id } = req.params;
    const data = await prisma.post.delete({
        where:{
            id: parseInt(id)
        }
    })
    .then()
    .catch(err => console.log(err))

    res.json(data).send(`il post numero ${id} è stato rimosso con successo`)
    console.log(`destroy`);
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}