import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TOrder, TPerson } from './person.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const OrderShema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const FullName = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const personSchema = new Schema<TPerson>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: FullName,
    required: true,
    // trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  orders: {
    type: [OrderShema],
  },
})

//hash password
personSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_round),
  )
  next()
})

//password don't response
personSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

//custom instance methode
// personSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Person.findOne({ id })
//   return existingUser
// }

export const Person = model<TPerson>('Person', personSchema)
