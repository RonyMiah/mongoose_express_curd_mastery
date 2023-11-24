import express from 'express'
import { personController } from './person.controller'

const router = express.Router()

//will call controller function

router.get('/api/users', personController.createPerson)
