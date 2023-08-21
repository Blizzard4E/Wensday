import { userInfo } from "os";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
    isUser: boolean;
    userInfo: {
        id: String | null;
        name: String | null;
        profile: String | null;
        email: String | null;
    };
    setIsUser: (
        isUser: boolean,
        userInfo: {
            id: String | null;
            name: String | null;
            profile: String | null;
            email: String | null;
        }
    ) => void;
    removeUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
    isUser: false,
    userInfo: {
        id: null,
        name: null,
        profile: null,
        email: null,
    },
    setIsUser: (
        isUser: boolean,
        userInfo: {
            id: String | null;
            name: String | null;
            profile: String | null;
            email: String | null;
        }
    ) => {
        set({ isUser, userInfo });
        console.log(userInfo);
    },
    removeUser: () => {
        set({
            isUser: false,
            userInfo: {
                id: null,
                name: null,
                profile: null,
                email: null,
            },
        });
        //console.log(userInfo);
    },
}));
