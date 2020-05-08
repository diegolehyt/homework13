const Burger = require('../models/burger')
const express = require('express')

const router = express.Router()

/* HTML Routes */
router.get('/', async function (req, res) {
  const data = await Burger.findAll()
  res.render('index', { burgers: data })
})

/* API ROUTES */
router.get('/api/burgers', async function (req, res) {
  try {
    const burgers = await Burger.findAll()
    res.status(200).json({ data: burgers })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/api/burgers', async function (req, res) {
  try {
    const burger = new Burger(req.body)
    await burger.save()
    res.status(201).json(burger)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.patch('/api/burgers/:id', async function (req, res) {
  let burger = await Burger.findById(req.params.id)
  if (!burger) return res.status(404).end()

  burger = Object.assign(burger, req.body, { id: req.params.id })

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
