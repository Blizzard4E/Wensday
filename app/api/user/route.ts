import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */
import jwt_decode from "jwt-decode";

interface Cookie {
    name: string;
    value: string;
    maxAge: number;
    path: string;
    expires: Date;
    httpOnly: boolean;
}

function extractCookies(cookies: any[]): Cookie[] {
    return cookies.map((cookie) => {
        return {
            name: Object.keys(cookie)[0],
            value: cookie[Object.keys(cookie)[0]],
            maxAge: cookie["Max-Age"],
            path: cookie["Path"],
            expires: cookie["Expires"],
            httpOnly: true,
        };
    });
}

export async function GET(req: Request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");
    const accessToken = cookieStore.get("accessToken");
    let response: NextResponse;
    if (accessToken) {
        let userData = jwt_decode(accessToken.value);
        response = NextResponse.json({
            status: 200,
            message: "Authorized Access",
            userData: userData,
        });
        return response;
    } else if (refreshToken) {
        // const tokenCookie = await getAccessToken(refreshToken.value).catch(
        //     (err) => {
        //         console.log(err);
        //     }
        // );
        // if (tokenCookie) {
        //     let userData = jwt_decode(tokenCookie[0].value);
        //     response = NextResponse.json({
        //         status: 200,
        //         message: "Authorized Access",
        //         userData: userData,
        //     });
        //     tokenCookie.forEach((cookie) => {
        //         console.log(cookie);
        //         response.cookies.set(cookie.name, cookie.value, cookie);
        //     });
        // } else {
        //     response = NextResponse.json({
        //         status: 401,
        //         message: "UnAuthorized Access",
        //     });
        // }
        let userData = jwt_decode(refreshToken.value);
        response = NextResponse.json({
            status: 200,
            message: "Authorized Access",
            userData: userData,
        });
        return response;
    } else {
        response = NextResponse.json({
            status: 401,
            message: "UnAuthorized Access",
        });
        return response;
    }
}
