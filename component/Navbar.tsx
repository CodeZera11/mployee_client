"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    const userId = localStorage.getItem("userId")


    const handleSignout = () => {
        localStorage.removeItem("userId");
        location.reload();
        router.push("/signup")
    }

    return (
        <nav className="flex items-center w-[1000px] p-10 justify-between text-red-600">
            <ul className="flex gap-10 text-md mr-5 text-[#4CC966]">
                <Link className="cool-link-nav" href={"/"}>
                    <li>Home</li>
                </Link>
                <Link className="cool-link-nav" href={"/create-post"}>
                    <li>Create Post</li>
                </Link>
                <Link className="cool-link-nav" href={"/signup"}>
                    <li>{userId ? (
                        <div onClick={handleSignout}>Signout</div>
                    ) : (
                        <div>Signup</div>
                    )}</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar