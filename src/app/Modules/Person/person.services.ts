//All busness logic in here

import { TPerson } from './person.interface'
import { Person } from './person.model'

const createPersonFromDB = async (person: TPerson) => {
  const result = await Person.create(person)
  return {
    userId: result.userId,
    username: result.username,
    fullName: {
      firstName: result.fullName.firstName,
      lastName: result.fullName.lastName,
    },
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: {
      street: result.address.street,
      city: result.address.city,
      country: result.address.country,
    },
  }
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
  const isExist = await Person.isUserExists(userId)
  return isExist
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
