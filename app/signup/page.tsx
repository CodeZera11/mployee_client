"use client"

import axios from 'axios'
import React, { useState } from 'react'

const SignupPage = () => {

    const [credentials, setCredentials] = useState({
        name: "",
        email: ""
    })

    const onChangeHandler = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/signup", credentials)
            console.log(response.data, "I am here")
            setCredentials({
                name: "",
                email: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex items-center justify-center flex-col gap-10'>
            <h1 className='text-4xl font-bold'>Signup</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                <div className='flex gap-5 items-center justify-center'>
                    <label htmlFor="name" className='text-2xl'>Name:</label>
                    <input onChange={onChangeHandler} name='name' type="text" id='name' className='px-4 py-2  rounded-full text-black' placeholder='Enter your name' />
                </div>
                <div className='flex gap-5 items-center justify-center'>
                    <label htmlFor="email" className='text-2xl'>Email:</label>
                    <input onChange={onChangeHandler} name='email' type="text" id='name' className='px-4 py-2 rounded-full text-black' placeholder='Enter your email' />
                </div>
                <button className='bg-white transition-colors duration-300 hover:bg-green-400  text-black px-4 py-2 rounded-xl '> Signup </button>
            </form>
        </div>
    )
}

export default SignupPage