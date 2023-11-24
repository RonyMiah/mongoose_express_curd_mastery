import { Request, Response } from 'express'
import { personServices } from './person.services'

const createPerson = async (req: Request, res: Response) => {
  try {
    const person = req.body
    //will call service function to send this data
    const result = await personServices.createPersonIntoDB(person)
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

export const personController = {
  createPerson,
}
