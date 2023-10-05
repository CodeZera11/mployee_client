import React from 'react'

const PostCard = ({ post }: any) => {

    console.log(post)

    return (
        <div className='w-[500px] items-center justify-center  flex flex-col gap-5 rounded-xl text-black bg-white'>
            <h1 className='text-2xl mt-10'>{post.title}</h1>
            <p className=''>{post.content}</p>
        </div>
    )
}

export default PostCard