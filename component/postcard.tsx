"use client";

import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React from 'react'
import toast from 'react-hot-toast'

const PostCard = ({ post }: any) => {

    const router = useRouter();

    const handleDelete = async () => {
        try {
            toast.loading("Deleting post...")
            const response = await axios.delete("http://localhost:8000/api/delete-post", {
                headers: {
                    postId: post.id
                }
            })
            toast.dismiss()
            toast.success(response.data.message)
            location.reload();
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='items-center justify-center flex flex-col gap-5 rounded-xl text-black bg-white p-10 shadow-lg shadow-zinc-500'>
            <h1 className='text-2xl uppercase font-semibold'>{post.title}</h1>
            <p className='text-center'>{post.content}</p>
            <div className='flex items-center gap-10 mt-5'>
                <Trash2 onClick={handleDelete} size={25} className='cursor-pointer' color='red' />
            </div>
        </div>
    )
}

export default PostCard