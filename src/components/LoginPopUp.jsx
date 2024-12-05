import React from 'react'
import { Link } from 'react-router-dom'
import { Button,Logo } from '../components'

export const LoginPopUp = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black  ">
            <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
                <div className="flex flex-col gap-2 items-center mb-10">
                    <Logo size="30" />
                </div>
                <p className="text-xl font-bold mb-2">
                    Login or Signup to continue
                </p>
                <Link to="/login">
                    <Button
                        className="bg-red-500 w-full py-2 px-4 font-bold text-lg rounded hover:scale-110 duration-100 ease-in"
                        textColor="text-black"
                    >
                        Login
                    </Button>
                </Link>
            </div>
        </div>
  )
}
