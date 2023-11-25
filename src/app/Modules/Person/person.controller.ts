import { Request, Response } from 'express'
import { personServices } from './person.services'

const createPerson = async (req: Request, res: Response) => {
  try {
    const person = req.body
    //will call service function to send this data
    const result = await personServices.createPersonFromDB(person)
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllPerson = async (req: Request, res: Response) => {
  try {
    const result = await personServices.getAllPersonFromDB()
    res.status(200).json({
      success: true,
      message: 'All User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleperson = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await personServices.getSinglePersonFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'All User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const personController = {
  createPerson,
  getAllPerson,
  getSingleperson,
}
