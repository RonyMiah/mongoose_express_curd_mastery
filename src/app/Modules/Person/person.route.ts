import express from 'express'
import { personController } from './person.controller'

const router = express.Router()

//will call controller function

router.post('/api/users', personController.createPerson)
router.get('/api/users', personController.getAllPerson)
router.get('/api/users/:userId', personController.getSingleperson)
router.put('/api/users/:userId', personController.getSingleperson)
router.delete('/api/users/:userId', personController.deletePerson)

//we know that router is an object thats why we export easyly.
export const personRoute = router
