import {z} from 'zod';

//VALIDACION DE LOS DATOS QUE LLEGAN DESDE EL FRONT, USO ZOD EN VEZ DE EXPRESS VALIDATOR

export const registerSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es requerido'
  }).min(2, {
    message: 'El nombre de usuario tiene que tener minimo 2 caracteres'
  }).max(25, {
    message: 'El nombre de usuario tiene que tener maximo 25 caracteres'
  }),
  email: z.string({
    required_error: 'El e-mail es requerido'
  }).email({message: 'e-mail invalido, debe contener un @ y .com'})
  .max(30, {
    message: 'El e-mail tiene que tener maximo 30 caracteres'
  }),
  password: z.string({
    required_error: 'El password es requerido'
  }).min(10, {message: 'El password tiene que tener minimo 10 caracteres'})
  .max(20, {message: 'El password tiene que tener maximo 20 caracteres'})
})

export const loginSchema = z.object({
  email: z.string({
    required_error: 'El e-mail es requerido'
  }).email({message: 'e-mail invalido, debe contener un @ y .com'})
  .max(30, {
    message: 'El e-mail tiene que tener maximo 30 caracteres'
  }),
  password: z.string({
    required_error: 'El password es requerido'
  }).min(10, {message: 'El password tiene que tener minimo 10 caracteres'})
  .max(20, {message: 'El password tiene que tener maximo 20 caracteres'})
})