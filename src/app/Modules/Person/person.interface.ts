

export type TAddress = {
  street: 'string'
  city: 'string'
  country: 'string'
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}
export type TFullName = {
  firstName: string
  lastName: string
}

export type TPerson = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders?: TOrder[]
}



//for creating instance 
// export type personMethods = {
//   isUserExists(id: string): Promise<TPerson | null>
// }

// export type PersonModel = Model<TPerson, Record<string, never>, personMethods>
