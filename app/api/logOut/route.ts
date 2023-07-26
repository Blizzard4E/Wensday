import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    cookies().set({
        name: "accessToken",
        value: "",
        expires: new Date(),
        path: "/",
    });
    cookies().set({
        name: "refreshToken",
        value: "",
        expires: new Date(),
        path: "/",
    });
    let response = NextResponse.json({
        status: 200,
        message: "Log Out Success",
    });
    return response;
}
