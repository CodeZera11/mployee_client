"use client"
import PostCard from "@/component/postcard"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {

  const router = useRouter();

  const [posts, setPosts] = useState<any>([])
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  if (!userId) {
    router.push("/signup")
  }

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const posts: any = await axios.get("http://localhost:8000/api/get-posts", {
        headers: {
          userId
        }
      });
      setPosts(posts.data.posts)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">Your Posts</h1>
      <div className="p-10 grid mx-auto sm:grid-cols-1 gap-10 mt-12">
        {
          loading ? (
            <p className="text-white text-xl">Fetching Posts...</p>
          ) :
            posts && posts.length > 0 ? posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            )) : (
              <p className="text-xl">No posts found. Please create post from here. <span><Link href={"/create-post"} className="text-blue-500 underline">Create Post</Link> </span></p>
            )
        }

      </div>

    </div >
  )
}
