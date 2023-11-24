const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const createSlug = require("../utilities/creatSlug")

async function index(req, res) {

    const filters = req.query.filter;
    const  queryFilter = {}

    if(filters && filters.title){
        queryFilter.title = { contains: filters.title };
    }

    if(filters && filters.published){
        queryFilter.publishedFilter = filters.published === "true" || filters.published === "1";
    }

    if(filters){
        const data = await prisma.post.findMany({
            where: queryFilter
        })
        .then()
        .catch()
    }
   

    const data = await prisma.post.findMany({})
    .then()
    .catch()

    console.log("index");
    res.json(data)
}

async function indexPublished(req, res) {

    const data = await prisma.post.findMany({
        where: {
            "published" : true
        }
    })
    .then()
    .catch()

    console.log("index");
    res.json(data)
}

async function search_title(req, res) {

    const {title} = req.params

    const data = await prisma.post.findMany({
        where: {
            "title" : `${title}`
        }
    })
    .then()
    .catch()

    console.log("index");
    res.json(data)
}

async function show(req, res, next) {
    const { id } = req.params;
    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }}
    )
    .then()
    .catch()

    if(!data){
        res.status(404).end("Post not Found")
        next(new Error("post not found"))
    } else{
        res.json(data)
    }

    
    console.log("show");
}

async function store(req, res) {

    const newPost = req.body;

    const slug = await createSlug(newPost.title);

    const data = await prisma.post.create({
        data:{
            "title": newPost.title,  
            "slug": JSON.stringify(slug),   
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
    indexPublished,
    search_title,
    show,
    store,
    update,
    destroy
}