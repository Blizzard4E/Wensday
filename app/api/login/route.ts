import { NextResponse } from "next/server";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */

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

function login(email: string, password: string) {
    return new Promise<Cookie[]>((resolve, reject) => {
        let cookiesJson: Cookie[] = [];
        fetch("https://wensday.cyclic.app/api/user/login", {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data.status == 404) {
                    reject(data);
                }
                //* Cookies Extractor
                let cookieString: string | null = res.headers.get("set-cookie");
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
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    const tokenCookie = await login(body.email, body.password).catch((err) => {
        console.log(err);
    });

    if (tokenCookie) {
        let response = NextResponse.json({
            status: 200,
            message: "Authorized Access",
        });
        tokenCookie.forEach((cookie) => {
            console.log(cookie);
            response.cookies.set(cookie.name, cookie.value, cookie);
        });
        return response;
    } else {
        let errResponse = NextResponse.json({
            status: 401,
            message: "Unauthorized Access",
        });
        return errResponse;
    }
}
