"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const CreatePostPage = () => {

    const router = useRouter();

    const userId = localStorage.getItem("userId");

    if (!userId) {
        router.push("/signup")
    }

    const [data, setData] = useState({
        title: "",
        content: ""
    })
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId")
            if (!userId) {
                toast.error("Please Sign In to continue")
                router.push("/signup")
            }

            const details = {
                data,
                userId
            }

            const response = await axios.post("http://localhost:8000/api/create-post", details)
            toast.success(response.data.message)
            setData({
                title: "",
                content: ""
            })

        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-screen flex items-center mt-10 flex-col gap-10'>
            <h1 className='text-4xl font-bold'>Create Post</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-10  w-screen'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <label htmlFor="title" className='text-2xl '>Title</label>
                    <input value={data.title} onChange={onChangeHandler} name='title' type="text" id='title' className='px-4 py-2  rounded-full text-black' placeholder='Enter title' />
                </div>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <label htmlFor="content" className='text-2xl'>Content</label>
                    <textarea value={data.content} onChange={onChangeHandler} name='content' id='content' className='px-4 py-2 rounded-xl w-[500px] text-black' placeholder='Enter content' />
                </div>
                <button className='w-[200px] mx-auto bg-white transition-colors duration-300 hover:bg-green-400  text-black px-4 py-2 rounded-xl '> {loading ? "Loading..." : "Create Post"} </button>
            </form>
        </div>
    )
}

export default CreatePostPage