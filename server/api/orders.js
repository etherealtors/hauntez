const router = require('express').Router()
const {Orders} = require('../db/models')

// router.get('/cart/:userId', async (req, res, next) => {
//   try {
//     console.log(req.session)
//     const cart = await Orders.getCart(req.params.userId)
//     res.json(cart)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/cart', async (req, res, next) => {
  try {
    if (req.session.passport.user) {
      const cart = await Orders.getCart(req.session.passport.user)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    const order = await Orders.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    const order = await Orders.updateStatus('Processing')
    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
