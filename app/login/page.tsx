import { cookies } from "next/headers";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */
import { redirect } from "next/navigation";

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

async function loginAPI(email: string, password: string) {
    return new Promise<Cookie[]>((resolve, reject) => {
        let cookiesJson: Cookie[] = [];
        console.log(email);
        fetch("https://wensday.cyclic.app/api/user/login", {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
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

export default function ContactForm() {
    async function login(formData: FormData) {
        "use server";

        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        if (email && password) {
            const tokenCookie = await loginAPI(email, password).catch((err) => {
                console.log(err);
            });
            if (tokenCookie) {
                tokenCookie.forEach((cookie) => {
                    console.log(cookie);
                    cookies().set(cookie.name, cookie.value, cookie);
                });
                redirect("/");
            }
        }
    }
    return (
        <div className="col-span-10 grid grid-cols-10">
            <div className="col-span-8 grid place-items-center h-full">
                <form
                    className="w-3/12 flex flex-col bg-white p-8 gap-y-1 border-slate-500 border rounded-xl"
                    action={login}
                >
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <label className="font-bold">Name:</label>
                    <input
                        className="py-2 px-4 rounded-xl bg-slate-100 focus:outline-none"
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                    />
                    <label className="mt-2 font-bold">Password:</label>
                    <input
                        className="py-2 px-4 rounded-xl bg-slate-100 focus:outline-none"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="mt-4 p-2 bg-black rounded-xl text-white font-bold"
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className="col-span-2"></div>
        </div>
    );
}
