import { NextResponse } from "next/server";
import { cookies } from "next/headers";
/* eslint-disable */
// @ts-ignore
import * as cookieParse from "cookie-parse";
/* eslint-enable */
import jwt_decode from "jwt-decode";

interface BlogComponent {
    type: number;
    text?: string;
    text2?: string;
}

function updateProject(
    accessToken: String,
    project_id: string,
    user_id: string,
    components: BlogComponent[],
    name: String,
    description: String,
    year: Number,
    members: String[],
    logo: string
) {
    return new Promise<any>((resolve, reject) => {
        console.log("Project id is " + project_id);
        console.log(components);
        fetch("https://wensday.cyclic.app/api/project/update/" + project_id, {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
            headers: {
                Cookie: "accessToken=" + accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                components: components,
                user_id: user_id,
                name: name,
                description: description,
                year: year,
                members: members,
                logo: logo,
            }),
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
        let userData: any = jwt_decode(accessToken.value);
        const projects = await updateProject(
            accessToken.value,
            body.project_id,
            userData.user_id,
            body.components,
            body.name,
            body.description,
            body.year,
            body.members,
            body.logo
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
