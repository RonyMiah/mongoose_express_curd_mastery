//All busness logic in here

import { TPerson } from './person.interface'
import { Person } from './person.model'

const createPersonFromDB = async (person: TPerson) => {
  const result = await Person.create(person)
  return result
}

const getAllPersonFromDB = async () => {
  const result = await Person.aggregate([
    //stage-1
    {
      $project: {
        _id: 0,
        userId: 0,
        password: 0,
        isActive: 0,
        hobbies: 0,
        isDeleted: 0,
        orders: 0,
        fullName: {
          _id: 0,
        },
        address: {
          _id: 0,
        },
        __v: 0,
      },
    },
  ])
  return result
}

const getSinglePersonFromDB = async (userId: string) => {
  const result = await Person.findOne({ userId })
  return result
}

const deletePersonFromDB = async (id: string) => {
  const result = await Person.updateOne({ id }, { isDeleted: true })
  return result
}

export const personServices = {
  createPersonFromDB,
  getAllPersonFromDB,
  getSinglePersonFromDB,
  deletePersonFromDB,
}
