// =============================================\ Controllers /===================================================== \\
// Require modules 
const Burger = require('../models/burger')
const express = require('express')

const router = express.Router()

/* HTML Routes */
router.get('/', async function (req, res) {
  const data = await Burger.findAll()
  // Send the rendered index.handlebar (html) to the client.
  res.render('index', { burgers: data })
})

/* API ROUTES */
router.get('/api/burgers', async function (req, res) {
  try {
    const burgers = await Burger.findAll()
    // Send the data to our API in Json format
    res.status(200).json({ data: burgers })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create new Burger from user input, using the burger model
router.post('/api/burgers', async function (req, res) {
  try {
    const burger = new Burger(req.body)
    // Save the data in to our API in Json format
    await burger.save()
    res.status(201).json(burger)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update the burger finding it by id.
router.patch('/api/burgers/:id', async function (req, res) {
  let burger = await Burger.findById(req.params.id)
  // error not found, in case the burger is not inside our API data
  if (!burger) return res.status(404).end()

  burger = Object.assign(burger, req.body, { id: req.params.id })
  // Save the new data
  try {
    await burger.save()
    res.status(200).json(burger)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/api/burgers/:id', async function (req, res) {
  const burger = await Burger.findById(req.params.id)
  if (!burger) return res.status(404).end()

  burger.name = req.body.name
  burger.devour = req.body.devour

  try {
    await burger.save()
    res.status(200).json(burger)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Delete Burger 
router.delete('/api/burgers/:id', async function (req, res) {
  const burger = await Burger.findById(req.params.id)
  if (!burger) return res.status(404).end()
  try {
    const deletedBurger = await burger.delete()
    res.status(200).json(deletedBurger)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
