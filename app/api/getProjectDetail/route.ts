import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */
import jwt_decode from "jwt-decode";

function getProjects(accessToken: String, id: String) {
    return new Promise<any>((resolve, reject) => {
        console.log("Project id is " + id);
        fetch("https://wensday.cyclic.app/api/project/" + id, {
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
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
                    message: "Fail to get project",
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
        const projects = await getProjects(
            accessToken.value,
            body.project_id
        ).catch((err) => {
            response = NextResponse.json(err);
            return response;
        });
        if (projects) {
            response = NextResponse.json(projects);
            return response;
        }
    }
}
