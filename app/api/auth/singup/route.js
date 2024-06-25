const { NextResponse } = require("next/server");
import { ConnectDB } from "@/libs/bd";
import User from "@/models/users";
import bcrypt from "bcryptjs"

export async function POST(request) {

  ConnectDB()

  try {
    const { username, password } = await request.json()

  if (!password || password.length < 6) {
    return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres" } ,
      { status: 400 })
  }

  const userFound = await User.findOne({ username })

  if (userFound) return NextResponse.json({ message: "El usuario ya existe" } ,
    { status: 409 })

  const passwordHashed = await bcrypt.hash(password, 12)

  const newUser = new User({
    username,
    password: passwordHashed
  })

  const userSaved = await newUser.save()

  console.log(userSaved)

  return NextResponse.json({
    id: userSaved._id,
    usuario: userSaved.username,
    dinero : userSaved.dinero
  })

  } catch (error) {
    console.log(error)
    if( error instanceof Error) {
      return NextResponse.json({
        message : error.message
      },{status : 400})
    }
  }
}