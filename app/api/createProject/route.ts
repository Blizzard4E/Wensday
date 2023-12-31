import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */
import jwt_decode from "jwt-decode";

function createProject(accessToken: String, data: any) {
    return new Promise<any>((resolve, reject) => {
        fetch("https://wensday.cyclic.app/api/project/create", {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
            body: JSON.stringify(data),
            headers: {
                Cookie: "accessToken=" + accessToken,
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const data = await res.json();
                console.log(data);
                if (data.status == 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            })
            .catch((err) => {
                reject({
                    status: 401,
                    message: "Fail to create project",
                });
            });
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");
    let response: NextResponse;
    if (accessToken) {
        const newProject = await createProject(accessToken.value, body).catch(
            (err) => {
                response = NextResponse.json(err);
                return response;
            }
        );
        if (newProject) {
            response = NextResponse.json(newProject);
            return response;
        }
    }
}
