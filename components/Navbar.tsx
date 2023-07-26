import { useUserStore } from "@/store";
import Link from "next/link";

export default function Navbar() {
    const { isUser, removeUser } = useUserStore();

    function logOut() {
        fetch("api/logOut")
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    removeUser();
                    window.location.href = "/login";
                }
            });
    }

    return (
        <nav className="grid grid-cols-12 gap-8 border-b-">
            <div className="col-span-2 grid place-items-center">Wensday</div>
            <div className="col-span-8 grid grid-cols-8 gap-8">
                <a className="place-self-center" href="/search">
                    Search
                </a>
                <div className="col-start-5 col-span-4 grid grid-cols-4 gap-8 place-items-center">
                    <Link href="/">Home</Link>
                    <Link href="/projects">All Projects</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-8 place-items-center">
                <div></div>
                {isUser ? (
                    <button
                        className="py-2 px-4 bg-red-500 text-white"
                        onClick={logOut}
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        className="py-2 px-4 bg-cyan-500 text-white"
                        href="/login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
