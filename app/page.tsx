"use client"
import PostCard from "@/component/postcard"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {

  const [posts, setPosts] = useState<any>([])

  const fetchPosts = async () => {
    const userId = localStorage.getItem("userId");
    const posts: any = await axios.get("http://localhost:8000/api/get-posts", {
      headers: {
        userId
      }
    });
    setPosts(posts.data.posts)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  console.log(posts)

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">Your Posts</h1>
      {
        posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))
      }
    </div >
  )
}
