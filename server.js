// ===========================================\ Server Setup /=============================================================\\
// Load dependency modules
const express = require('express')
const exphbs = require('express-handlebars')

// Create the Express app instance
const app = express()

// Use the express.static middleware to serve static content
// from the "./public" directory in the application structure.
app.use(express.static('public'))

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Set up the Express app to use the Handlebars template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Handle all dynamic routes with our controller
app.use(require('./controllers/burger_controllers'))

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000
// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`)
})
