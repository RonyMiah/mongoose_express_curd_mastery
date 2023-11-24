//all busness logic in here

import { Person } from './person.interface'
import { PersonModel } from './person.model'

const createPersonIntoDB = async (person: Person) => {
  const result = await PersonModel.create(person)

  return result
}

export const personServices = {
  createPersonIntoDB,
}
