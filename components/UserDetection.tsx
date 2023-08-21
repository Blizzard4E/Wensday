"use client";
import { useEffect } from "react";
import { useUserStore } from "@/store";
import { usePathname } from "next/navigation";

export default function UserDetection() {
    const pathname = usePathname();
    const { isUser, userInfo, setIsUser, removeUser } = useUserStore();
    useEffect(() => {
        console.log(userInfo);
        fetch("../api/user", {
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 200) {
                    setIsUser(true, {
                        id: data.userData.user_id,
                        name: data.userData.name,
                        profile: data.userData.profile,
                        email: data.userData.email,
                    });
                } else {
                    setIsUser(false, {
                        id: null,
                        name: null,
                        profile: null,
                        email: null,
                    });
                }
            });
    }, [isUser, pathname]);

    return <div></div>;
}
