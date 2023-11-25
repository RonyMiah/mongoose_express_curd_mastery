//All busness logic in here

import { TPerson } from './person.interface'
import { Person } from './person.model'

const createPersonFromDB = async (person: TPerson) => {
  const result = await Person.create(person)
  return result
}

const getAllPersonFromDB = async () => {
  const result = await Person.find()
  return result
}

const getSinglePersonFromDB = async (userId: string) => {
  const result = await Person.findOne({ userId })

  // const person = new Person(userId)
  // if (await person.isUserExists(userId)) {
  //   throw new Error('User Already Exists !')
  // }
  // const result = await person.get(userId)

  return result
}

export const personServices = {
  createPersonFromDB,
  getAllPersonFromDB,
  getSinglePersonFromDB,
}
