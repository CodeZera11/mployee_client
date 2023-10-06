"use client";

import Link from "next/link";

export default function Home() {

  const userId = localStorage.getItem("userId");

  return (
    <div className="flex items-center justify-center mt-19">
      <Link href={`/fetch-posts/${userId}`} className="px-4 py-2 rounded-xl bg-blue-400">Fetch posts</Link>
    </div>
  )
}
