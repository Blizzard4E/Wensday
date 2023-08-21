"use client";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
    project_id: Number;
    name: String;
    logo: string | null;
    description: String | null;
    year: String | null;
    is_public: Boolean;
}

export default function MyProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        fetch("api/getAccess", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.status == 200) {
                    const myProjects = await fetch("api/getProjects", {
                        credentials: "include",
                        mode: "no-cors",
                        cache: "no-store",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await myProjects.json();
                    console.log(result);
                    setProjects(result.projects);
                }
            });
    }, []);

    return (
        <div className="relative col-span-10 grid grid-cols-10">
            <div className="col-span-8 grid w-full">
                <div className="grid grid-cols-3 gap-4">
                    {projects.map((project, index) => {
                        return (
                            <Link
                                href={"/myProjects/" + project.project_id}
                                key={index}
                                className="border-gray-300 border bg-white p-4 rounded-2xl cursor-pointer"
                            >
                                <div className="relative w-16 h-16">
                                    {project.logo == null ||
                                    project.logo.length == 0 ? (
                                        <Image
                                            src="/fake/image.jpg"
                                            alt=""
                                            fill
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <Image
                                            src={project.logo}
                                            alt=""
                                            fill
                                            objectFit="cover"
                                        />
                                    )}
                                </div>
                                <h2 className="font-bold text-lg mt-2">
                                    {project.name}
                                </h2>
                                <p className="mt-2 text-md">
                                    {project.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <section className="col-span-2"></section>
        </div>
    );
}
