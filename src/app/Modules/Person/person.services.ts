//All busness logic in here

import { TOrder, TPerson } from './person.interface'
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

const updateSinglePersonFromDB = async (userId: string, bodyData: TPerson) => {
  const person = await Person.isUserExists(userId)
  if (person) {
    const personresponse = await Person.findOneAndUpdate(
      { userId },
      { ...bodyData }, // Update
      { new: true }, // Return the modified document
    ).select(
      '-_id -__v -password -orders -isDeleted -fullName._id -address._id',
    )
    return personresponse
  }
}

const deleteSinglePersonFromDB = async (userId: string) => {
  const person = await Person.isUserExists(userId)
  if (person) {
    const result = await Person.findOneAndUpdate(
      { userId },
      { isDeleted: true },
    ).select('isDeleted')
    if (result?.isDeleted) {
      return null
    }
    return null
  }
}

const createOrderPrsonFromDB = async (userId: string, body: TOrder) => {
  const person = await Person.isUserExists(userId)
  if (person) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await Person.findOneAndUpdate(
      { userId },
      { $addToSet: { orders: body } },
    ).select('orders')
  }
  return null
}

export const personServices = {
  createPersonFromDB,
  getAllPersonFromDB,
  getSinglePersonFromDB,
  deleteSinglePersonFromDB,
  updateSinglePersonFromDB,
  createOrderPrsonFromDB,
}
