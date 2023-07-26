"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useUserStore } from "@/store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Wensday - Home",
    description: "Wensday home page",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { isUser, userInfo, setIsUser, removeUser } = useUserStore();
    useEffect(() => {
        console.log(userInfo);
        fetch("api/user", {
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    setIsUser(true, {
                        name: data.userData.name,
                        profile: data.userData.profile,
                        email: data.userData.email,
                    });
                } else {
                    setIsUser(false, {
                        name: null,
                        profile: null,
                        email: null,
                    });
                }
            });
    }, [isUser, pathname]);
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="grid grid-cols-12 px-8 py-4 gap-8">
                    <div className="col-span-12">
                        <Navbar />
                    </div>
                    <div className="col-span-2 h-full border-r-2">
                        Project Tree
                    </div>
                    <div className="col-span-10">{children}</div>
                </div>
            </body>
        </html>
    );
}
