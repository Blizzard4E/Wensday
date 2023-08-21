"use client";
import Image from "next/image";
import { RefObject, use, useRef, useState } from "react";
import { Fira_Code } from "next/font/google";
import TextareaAutosize from "react-textarea-autosize";

export default function CreateProject() {
    const imageRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    function uploadImage(file: Blob) {
        return new Promise<String>(async (resolve, reject) => {
            let formData: FormData = new FormData();
            const PRESET_NAME = process.env.NEXT_PUBLIC_PRESET_NAME as string;
            const CLOUD_API_KEY = process.env
                .NEXT_PUBLIC_CLOUD_API_KEY as string;
            const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
            formData.append("file", file);
            formData.append("upload_preset", PRESET_NAME);
            formData.append("api_key", CLOUD_API_KEY);
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const image = await response.json();
            resolve(image.url);
        });
    }

    async function createProject() {
        const hasAccess = await fetch("api/getAccess", {
            credentials: "include",
            mode: "no-cors",
            cache: "no-store",
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (imageRef.current) {
                    if (imageRef.current.files) {
                        const imageFile = imageRef.current.files[0];
                        const imageURL = await uploadImage(imageFile);

                        if (imageURL) {
                            fetch("api/createProject", {
                                method: "POST",
                                credentials: "include",
                                mode: "no-cors",
                                cache: "no-store",
                                body: JSON.stringify({
                                    name: nameRef.current?.value,
                                    description: descRef.current?.value,
                                    year: 2023,
                                    components: [],
                                    user_id: "1",
                                    members: ["1"],
                                    logo: imageURL,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }).then(async (res) => {
                                const data = await res.json();
                                console.log(data);
                            });
                        }
                    }
                }
                console.log(data);
            });
    }

    return (
        <div className="relative col-span-10 grid grid-cols-10">
            <div className="col-span-8 grid w-full">
                <div className="flex gap-x-4">
                    <div>
                        <h1 className="font-bold text-lg text-center">Logo</h1>
                        <label>
                            <div className="rounded-xl w-20 border-gray-300 border px-4 py-2 aspect-square grid place-items-center cursor-pointer bg-white">
                                <Image
                                    src="/icons/upload-big-arrow.png"
                                    width={32}
                                    height={32}
                                    alt={""}
                                />
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                ref={imageRef}
                            />
                        </label>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl">Project Name</h1>
                        <input
                            className="px-4 py-2 rounded-2xl resize-none border-gray-300 border focus:outline-none w-80"
                            type="text"
                            ref={nameRef}
                            placeholder="My Project Name..."
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="font-bold text-lg">Description</label>
                    <textarea
                        ref={descRef}
                        className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                        rows={5}
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        className="mt-4 px-4 py-2 rounded-xl bg-dark-mint text-light"
                        onClick={createProject}
                    >
                        Create
                    </button>
                </div>
            </div>
            <section className="col-span-2"></section>
        </div>
    );
}
