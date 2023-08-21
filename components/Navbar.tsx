import { useUserStore } from "@/store";
import Link from "next/link";
import { Jomhuria } from "next/font/google";

const jomhuria = Jomhuria({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

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
        <nav className="grid grid-cols-12 gap-8 bg-dark-blue py-1">
            <div className="col-span-2 grid place-items-center text-5xl text-light-mint">
                <span className={jomhuria.className}>Wensday</span>
            </div>
            <div className="col-span-8 flex items-center justify-between gap-8">
                <a
                    className="place-self-center bg-dark-lightblue text-light/50 w-48 px-2 py-1 text-sm"
                    href="/search"
                >
                    Search
                </a>
                {isUser ? (
                    <div className="col-start-5 col-span-4 flex items-center gap-8 text-light text-sm">
                        <Link href="/">Home</Link>
                        <Link href="/projects">All Projects</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/addTech">Add Tech</Link>
                        <Link href="/myProjects">My Projects</Link>
                        <Link href="/createProject">Create Project</Link>
                    </div>
                ) : (
                    <div className="col-start-5 col-span-4 flex items-center gap-8 text-light text-sm">
                        <Link href="/">Home</Link>
                        <Link href="/projects">All Projects</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>
                )}
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-8 place-items-center">
                <div></div>
                {isUser ? (
                    <button
                        className="py-1 px-2 bg-bittersweet text-white text-sm"
                        onClick={logOut}
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        className="py-1  px-2 bg-cyan-500 text-white  text-sm"
                        href="/login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
