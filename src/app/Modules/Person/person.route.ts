import express from 'express'
import { personController } from './person.controller'

const router = express.Router()

//Router will call controller function

router.post('/api/users', personController.createPerson)
router.get('/api/users', personController.getAllPerson)
router.get('/api/users/:userId', personController.getSingleperson)
router.put('/api/users/:userId', personController.updateSinglePerson)
router.delete('/api/users/:userId', personController.deletePerson)
router.put('/api/users/:userId/orders', personController.createOrderPerson)
router.get('/api/users/:userId/orders', personController.getOrderPerson)
router.get('/api/users/:userId/orders/total-price',personController.totalPriceSumOrders)

export const personRoute = router
