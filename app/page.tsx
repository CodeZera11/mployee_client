"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const userId = localStorage.getItem("userId");

  if (!userId) {
    router.push("/signup")
  }

  return (
    <div className="flex items-center justify-center mt-19">
      <Link href={`/fetch-posts/${userId}`} className="px-4 py-2 rounded-xl bg-blue-400">Fetch posts</Link>
    </div>
  )
}
