'use client'

import React, { useState } from 'react'
import axios, { AxiosError } from "axios"

const RegisterPage = () => {

  const [error, setErrors] = useState()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      const res = await axios.post("/api/auth/singup", {
        username: formData.get("username"),
        password: formData.get("password")
      })
      console.log(res)
    } catch (error) {
      console.log(error)
      if( error instanceof AxiosError){
      setErrors(error.response.data.message)
      }
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='border-2 border-black rounded-lg mx-auto flex flex-col gap-y-2 w-[500px] p-10 bg-violet-900'>

      {error &&  
      <div className='w-full absolute top-0 left-0 bg-red-700 text-white text-xs py-2 text-center'> 
      {error} 
      </div>}
        <input placeholder='usuario' className='bg-gray-200 rounded-md p-2 border-2 border-gray-300' name="username" />

        <input placeholder='contraseña' className='bg-gray-200 rounded-md p-2 border-2 border-gray-300' name="password" />

        <button className='bg-blue-500 text-white w-[200px] mx-auto rounded-lg py-3 '> Registrar </button>
      </form>
    </div>
  )
}

export default RegisterPage