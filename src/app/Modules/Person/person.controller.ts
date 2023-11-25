import { Request, Response } from 'express'
import { personServices } from './person.services'
import personValidationSchema from './person.validation'

const createPerson = async (req: Request, res: Response) => {
  try {
    const person = req.body

    //data validation using joi
    const { error, value } = personValidationSchema.validate(person)
    //send data to db
    const result = await personServices.createPersonFromDB(value)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Some went to be wrong',
        error: error.details,
      })
    }
    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some went to be wrong',
      error: error,
    })
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
    res.status(500).json({
      success: false,
      message: 'Some went to be wrong',
      error: error,
    })
  }
}

const getSingleperson = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await personServices.getSinglePersonFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'Single User fetched successfully!',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message  || 'User not found',
      error: {
        code: 500,
        description: 'User not found!',
      },
    })
  }
}

export const personController = {
  createPerson,
  getAllPerson,
  getSingleperson,
}
