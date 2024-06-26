const mongoose = require('mongoose')
const express = require('express')
const Recipe = require('./Schema.js')
const bodyParser = require('body-parser')
const cors=require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())


async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://aarthi32:Aarthi32@cluster0.grrieqs.mongodb.net/Recipe?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB Connection established')
        const port = process.env.PORT || 8002 // in cloud service take any port no which is avaliable(process.env.PORT) , in local machine it will take 8002 as port number
        app.listen(port, function () {
            console.log(`Listening on port ${port} `)
        })
    } catch (error) {
        console.log(error)
        console.log("Couldn't establish connection")
    }
}

connectToDb()
       
app.post('/add-recipe', async function (request, response) {
    try {
        const newRecipe = await Recipe.create({
            title: request.body.title,
            cuisine:request.body.cuisine,
            ingredients: request.body. ingredients,
            instructions: request.body.instructions,
            imageUrl: request.body.imageUrl
            
        })
        response.status(201).json({
            status: 'success',
            message: 'Recipe created successfully',
            user: newRecipe
        })
    } catch (error) {
        console.error('Error creating user:', error)
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create user',
            error: error.message
        })
    }
})

app.get('/req-recipe', async function (request, response) {
    try {
        const { cuisine } = request.query
        const recipes = await Recipe.find({ cuisine })
        response.status(200).json(recipes)
    } catch (error) {
        console.error('Error fetching questions:', error)
        response.status(500).json({
            status: 'failure',
            message: 'Failed to fetch questions',
            error: error.message
        })
    }
})