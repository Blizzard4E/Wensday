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

function getAccessToken(refreshToken: string) {
    return new Promise<Cookie[]>((resolve, reject) => {
        let cookiesJson: Cookie[] = [];
        fetch("https://wensday.cyclic.app/api/requestAccessToken", {
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
            headers: {
                Cookie: "refreshToken=" + refreshToken,
            },
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data.status == 200) {
                    //* Cookies Extractor
                    let cookieString: string | null =
                        res.headers.get("set-cookie");
                    let cookies: Cookie[] = [];
                    //* Turns the cookie string into array of cookies
                    if (cookieString) {
                        let cookieStringArray: string[] = cookieString?.split(
                            /,(?=\s*[a-zA-Z0-9_\-]+=)/
                        );
                        cookieStringArray.forEach((cookieString) => {
                            let cookieParsed = cookieParse.parse(cookieString);
                            cookies.push(cookieParsed);
                        });
                    }
                    //* Format the cookies correctly to use
                    cookiesJson = extractCookies(cookies);
                    //console.log(cookiesJson);
                    resolve(cookiesJson);
                } else {
                    reject(data);
                }
            })
            .catch((err) => {
                reject(err);
            });
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
