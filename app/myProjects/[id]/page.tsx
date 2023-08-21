"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Fira_Code } from "next/font/google";
import TextareaAutosize from "react-textarea-autosize";
import { type } from "os";

interface BlogComponent {
    type: number;
    text?: string;
    text2?: string;
}

type Params = {
    params: {
        id: string;
    };
};

const firaCode = Fira_Code({
    subsets: ["latin"],
    display: "swap",
});

export default function ProjectPage({ params: { id } }: Params) {
    const [showEdit, setShowEdit] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [logo, setLogo] = useState("");
    const [showComponents, setShowComponents] = useState(false);
    const [blogComponents, setBlogComponents] = useState<BlogComponent[]>([]);

    useEffect(() => {
        fetch("../api/getAccess", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.status == 200) {
                    const myProjects = await fetch("../api/getProjectDetail", {
                        method: "POST",
                        credentials: "include",
                        mode: "no-cors",
                        cache: "no-store",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            project_id: id,
                        }),
                    });
                    const result = await myProjects.json();
                    console.log(result);
                    setBlogComponents(result.project.components);
                    setProjectName(result.project.name);
                    setProjectDesc(result.project.description);
                    setLogo(result.project.logo);
                }
            });
    }, []);

    function saveComponents() {
        fetch("../api/getAccess", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.status == 200) {
                    console.log("Before updating");
                    const updateProject = await fetch("../api/updateProject", {
                        method: "POST",
                        credentials: "include",
                        mode: "no-cors",
                        cache: "no-store",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            project_id: id,
                            year: 2023,
                            members: ["1"],
                            name: projectName,
                            description: projectDesc,
                            components: blogComponents,
                            logo: logo,
                        }),
                    });
                    const result = await updateProject.json();
                    console.log(result);
                    if (result) {
                        setShowEdit(false);
                    }
                }
            });
    }

    return (
        <div className="relative col-span-10 grid grid-cols-10">
            {showComponents && showEdit && (
                <div className="fixed z-10">
                    <div
                        className="fixed top-0 left-0 w-screen h-screen bg-gray-500/50"
                        onClick={() => setShowComponents(false)}
                    ></div>
                    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50vw] bg-light p-4 rounded-2xl">
                        <div>
                            <h1 className="font-bold text-2xl">Components</h1>
                            <div className="grid grid-cols-3 mt-2 gap-4">
                                <button
                                    className="w-full h-44 bg-dark-blue rounded-2xl grid place-items-center p-4"
                                    onClick={() => {
                                        setBlogComponents([
                                            ...blogComponents,
                                            { type: 0, text: "Hello" },
                                        ]);
                                        setShowComponents(false);
                                    }}
                                >
                                    <div className="text-light w-full font-bold text-sm bg-dark-lightblue rounded-2xl h-full grid place-items-center">
                                        Text
                                    </div>
                                </button>
                                <label className="w-full h-44 bg-dark-blue rounded-2xl grid place-items-center cursor-pointer">
                                    <div className="grid grid-rows-4 h-full w-full p-4 pb-0                     ">
                                        <div className="row-span-3 w-full h-full bg-dark-lightblue rounded-2xl text-light font-bold text-sm grid place-items-center">
                                            Image
                                        </div>
                                        <div className="row-span-1 h-full text-light text-sm font-bold grid place-items-center">
                                            Caption
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(event) => {
                                            if (event.target.files) {
                                                console.log(
                                                    event.target.files[0].name
                                                );
                                                setBlogComponents([
                                                    ...blogComponents,
                                                    {
                                                        type: 1,
                                                        text: "",
                                                        text2: event.target
                                                            .files[0].name,
                                                    },
                                                ]);
                                                setShowComponents(false);
                                            }
                                        }}
                                    />
                                </label>
                                <button
                                    className="w-full h-44 bg-dark-blue rounded-2xl grid place-items-center p-4"
                                    onClick={() => {
                                        setBlogComponents([
                                            ...blogComponents,
                                            { type: 2, text: "Code" },
                                        ]);
                                        setShowComponents(false);
                                    }}
                                >
                                    <div className="text-light w-full font-bold text-sm bg-dark-lightblue rounded-2xl h-full grid place-items-center">
                                        Code
                                    </div>
                                </button>
                                <button className="w-full h-40 bg-dark-blue rounded-2xl grid grid-cols-4 p-4 place-items-center ">
                                    <div className="w-12 h-12 bg-dark-lightblue rounded-xl"></div>
                                    <div className="w-12 h-12 bg-dark-lightblue rounded-xl"></div>
                                    <div className="w-12 h-12 bg-dark-lightblue rounded-xl"></div>
                                    <div className="w-12 h-12 bg-dark-lightblue rounded-xl"></div>
                                    <div className="col-span-4 text-light font-bold text-sm">
                                        Tech Stack
                                    </div>
                                </button>
                                <div className="w-full grid gap-2 grid-rows-3">
                                    <button
                                        className="bg-dark-lightblue text-light font-bold text-md rounded-xl"
                                        onClick={() => {
                                            setBlogComponents([
                                                ...blogComponents,
                                                { type: 4, text: "Heading 1" },
                                            ]);
                                            setShowComponents(false);
                                        }}
                                    >
                                        Heading 1
                                    </button>
                                    <button
                                        className="bg-dark-lightblue text-light font-bold text-md rounded-xl"
                                        onClick={() => {
                                            setBlogComponents([
                                                ...blogComponents,
                                                { type: 5, text: "Heading 2" },
                                            ]);
                                            setShowComponents(false);
                                        }}
                                    >
                                        Heading 2
                                    </button>
                                    <button
                                        className="bg-dark-lightblue text-light font-bold text-md rounded-xl"
                                        onClick={() => {
                                            setBlogComponents([
                                                ...blogComponents,
                                                {
                                                    type: 6,
                                                    text: "Link Title",
                                                    text2: "Link",
                                                },
                                            ]);
                                            setShowComponents(false);
                                        }}
                                    >
                                        Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <section className="relative col-span-8 grid w-full">
                <div className="absolute top-0 right-0">
                    <button
                        className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-light"
                        onClick={() => setShowEdit(!showEdit)}
                    >
                        {showEdit ? "View" : "Edit"}
                    </button>
                </div>
                {showEdit ? (
                    <div>
                        <div className="flex gap-x-4">
                            <div>
                                <h1 className="font-bold text-lg text-center">
                                    Logo
                                </h1>
                                <label>
                                    <div className="rounded-xl w-20 border-gray-300 border px-4 py-2 aspect-square grid place-items-center cursor-pointer bg-white">
                                        <Image
                                            src="/icons/upload-big-arrow.png"
                                            width={32}
                                            height={32}
                                            alt={""}
                                        />
                                    </div>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                            <div>
                                <h1 className="font-bold text-xl">
                                    Project Name
                                </h1>
                                <input
                                    className="px-4 py-2 rounded-2xl resize-none border-gray-300 border focus:outline-none w-80"
                                    type="text"
                                    value={projectName}
                                    onChange={(event) => {
                                        setProjectName(event.target.value);
                                    }}
                                    placeholder="My Project Name..."
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="font-bold text-lg">
                                Description
                            </label>
                            <TextareaAutosize
                                value={projectDesc}
                                className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                                onChange={(event) => {
                                    setProjectDesc(event.target.value);
                                }}
                            ></TextareaAutosize>
                        </div>
                        <h1 className="font-bold text-lg">Components</h1>
                        <div className="mt-4 grid gap-4">
                            {blogComponents.map((component, index) => {
                                switch (component.type) {
                                    case 0:
                                        return (
                                            <div key={index}>
                                                <TextareaAutosize
                                                    className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    case 1:
                                        return (
                                            <div key={index}>
                                                {component.text2 && (
                                                    <div className="w-full relative rounded-2xl overflow-hidden">
                                                        <Image
                                                            src={
                                                                "/fake/" +
                                                                component.text2
                                                            }
                                                            alt={""}
                                                            width={100}
                                                            height={100}
                                                            layout="responsive"
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <TextareaAutosize
                                                    className="mt-2 px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none text-center"
                                                    placeholder="Caption..."
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div
                                                key={index}
                                                className={firaCode.className}
                                            >
                                                <TextareaAutosize
                                                    className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div key={index}>
                                                <input
                                                    className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    case 5:
                                        return (
                                            <div key={index}>
                                                <input
                                                    className="px-4 py-2 rounded-2xl resize-none w-full border-gray-300 border focus:outline-none"
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                    case 6:
                                        return (
                                            <div
                                                key={index}
                                                className="grid grid-cols-10 px-4 py-2 rounded-2xl w-full bg-white border-gray-300 border"
                                            >
                                                <input
                                                    className="col-span-2 focus:outline-none"
                                                    value={component.text}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                                <input
                                                    className="col-span-8 focus:outline-none border-l-2 border-gray-300 pl-4"
                                                    value={component.text2}
                                                    onChange={(event) => {
                                                        const newArray =
                                                            blogComponents.map(
                                                                (
                                                                    component,
                                                                    i
                                                                ) => {
                                                                    if (
                                                                        i ==
                                                                        index
                                                                    ) {
                                                                        component.text2 =
                                                                            event.target.value;
                                                                    }
                                                                    return component;
                                                                }
                                                            );
                                                        setBlogComponents(
                                                            newArray
                                                        );
                                                    }}
                                                />
                                            </div>
                                        );
                                }
                            })}
                        </div>
                        <div className="mt-4 grid">
                            <button
                                className="rounded-2xl grid place-items-center p-4 bg-dark-mint"
                                onClick={() => setShowComponents(true)}
                            >
                                <Image
                                    src="/icons/add.png"
                                    width={24}
                                    height={24}
                                    alt={""}
                                />
                                <p className="text-light text-md mt-2">
                                    Add Component
                                </p>
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="mt-4 px-4 py-2 rounded-xl bg-dark-mint text-light"
                                onClick={saveComponents}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <div className="flex gap-4">
                            <div className="relative w-20 h-20">
                                {logo == null || logo.length == 0 ? (
                                    <Image
                                        src="/fake/image.jpg"
                                        alt=""
                                        fill
                                        objectFit="cover"
                                    />
                                ) : (
                                    <Image
                                        src={logo}
                                        alt=""
                                        fill
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <h1 className="text-xl font-bold">{projectName}</h1>
                        </div>
                        <p className="text-lg">{projectDesc}</p>
                        <div className="text-lg pb-16 grid gap-4">
                            {blogComponents.map((component, index) => {
                                switch (component.type) {
                                    case 0:
                                        return (
                                            <div key={index}>
                                                {component.text}
                                            </div>
                                        );
                                    case 1:
                                        return (
                                            <div key={index}>
                                                <div className="w-full relative rounded-2xl overflow-hidden">
                                                    <Image
                                                        src={
                                                            "/fake/" +
                                                            component.text2
                                                        }
                                                        alt={""}
                                                        width={100}
                                                        height={100}
                                                        layout="responsive"
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-center">
                                                    {component.text}
                                                </p>
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div
                                                key={index}
                                                className={firaCode.className}
                                            >
                                                <p className="bg-white p-2">
                                                    {component.text}
                                                </p>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div key={index}>
                                                <h1 className="text-2xl font-bold">
                                                    {component.text}
                                                </h1>
                                            </div>
                                        );
                                    case 5:
                                        return (
                                            <div key={index}>
                                                <h2 className="text-xl font-bold">
                                                    {component.text}
                                                </h2>
                                            </div>
                                        );
                                    case 6:
                                        return (
                                            <div key={index} className="flex">
                                                <h3 className="font-bold">
                                                    {component.text}:{" "}
                                                    <span className="text-blue-500">
                                                        {component.text2}
                                                    </span>
                                                </h3>
                                            </div>
                                        );
                                }
                            })}
                        </div>
                    </div>
                )}
            </section>
            <section className="col-span-2"></section>
        </div>
    );
}
