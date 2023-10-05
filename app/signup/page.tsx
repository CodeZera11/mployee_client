"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SignupPage = () => {

    const router = useRouter();

    const [credentials, setCredentials] = useState({
        name: "",
        email: ""
    })
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/api/signup", credentials)
            toast.success(response.data.message)
            setCredentials({
                name: "",
                email: ""
            })
            localStorage.setItem("userId", response.data.user.id)
            router.push("/create-post")
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-screen flex items-center justify-center flex-col gap-10'>
            <h1 className='text-4xl font-bold'>Signup</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-10'>
                <div className='flex gap-5 items-center justify-center'>
                    <label htmlFor="name" className='text-2xl'>Name:</label>
                    <input value={credentials.name} autoComplete="off" onChange={onChangeHandler} name='name' type="text" id='name' className='px-4 py-2  rounded-full text-black' placeholder='Enter your name' />
                </div>
                <div className='flex gap-5 items-center justify-center'>
                    <label htmlFor="email" className='text-2xl'>Email:</label>
                    <input value={credentials.email} autoComplete="off" onChange={onChangeHandler} name='email' type="text" id='name' className='px-4 py-2 rounded-full text-black' placeholder='Enter your email' />
                </div>
                <button disabled={loading} className='bg-white transition-colors duration-300 hover:bg-green-400  text-black px-4 py-2 rounded-xl'> {loading ? "signing up..." : "Sign Up"} </button>
            </form>
        </div>
    )
}

export default SignupPage