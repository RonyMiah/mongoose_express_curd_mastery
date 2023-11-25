//all busness logic in here

import { Person } from './person.interface'
import { PersonModel } from './person.model'

const createPersonFromDB = async (person: Person) => {
  const result = await PersonModel.create(person)
  return result
}

const getAllPersonFromDB = async () => {
  const result = await PersonModel.find()
  return result
}

const getSinglePersonFromDB = async (userId: string) => {
  const result = await PersonModel.findOne({ userId })
  return result
}

export const personServices = {
  createPersonFromDB,
  getAllPersonFromDB,
  getSinglePersonFromDB,
}
