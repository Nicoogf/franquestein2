import mongoose from "mongoose";
const { MONGODB_URI } = process

export const ConnectDB = async () => {
  try {
    const { connection } = await mongoose.connect("mongodb://localhost:27017/pruebados")
    if (connection.readyState === 1) {
      console.log(">>> Conexion DataBase Exitosa")
      return Promise.resolve(true)
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(false)
  }
}