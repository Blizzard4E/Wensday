import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Oxygen } from "next/font/google";
import UserDetection from "@/components/UserDetection";

const inter = Inter({ subsets: ["latin"] });
const oxygen = Oxygen({
    weight: ["400", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Wensday - Home",
    description: "Wensday home page",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-light">
            <body className={oxygen.className}>
                <UserDetection />
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Navbar />
                    </div>
                    <div className="grid grid-cols-12 col-span-12 gap-4 p-4">
                        <div className="col-span-2 h-full border-r-2">
                            Project Tree
                        </div>
                        <div className="col-span-10">{children}</div>
                    </div>
                </div>
            </body>
        </html>
    );
}
