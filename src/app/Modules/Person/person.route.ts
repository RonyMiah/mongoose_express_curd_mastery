import express from 'express'
import { personController } from './person.controller'

const router = express.Router()

//will call controller function

router.post('/api/users', personController.createPerson)

//we know that router is an object thats why we export easyly.
export const personRoute = router
