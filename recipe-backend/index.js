const mongoose = require('mongoose')
const express = require('express')
const Recipe = require('./Schema.js')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())



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
        const newUser = await Recipe.create({
            // topic: request.body.topic,
            title: request.body.title,
            ingredients: request.body.ingredients,
            instructions: request.body.instructions,
            imageUrl: request.body.imageUrl
        })
        response.status(201).json({
            status: 'success',
            message: 'Dish created successfully',
            
        })
    } catch (error) {
        console.error('Error creating dISH:', error)
        response.status(500).json({
            status: 'failure',
            message: 'Failed to create Dish',
            error: error.message
        })
    }
})