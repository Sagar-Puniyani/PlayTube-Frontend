import React, { useState } from 'react'
import { Input,Button } from '../'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Search = ({button}) => {

  const {register,handleSubmit}=useForm();
  const navigate=useNavigate();

  const search=(data)=>{
    const query=data?.query;
    navigate(`/search/${query}`)
  }
  return (
    <>
        <form onSubmit={handleSubmit(search)} >
        <Input
            placeholder="Search"
            {...register("query",{required:true})}
        />
        {
          button && (
            <Button className='text-white fixed top-12 right-7 w-[20%] h-[42px]' bgColor='bg-red-500' type='submit'>Search</Button>
          )
        }
        </form>
    </>
  )
}

