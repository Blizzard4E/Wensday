async function getAllProjects() {
    const res = await fetch(
        "https://wensday.cyclic.app/api/public/project/all"
    );
    return res.json();
}

export default async function Projects() {
    const data = await getAllProjects();
    console.log(data);
    return (
        <div className="relative col-span-10 grid grid-cols-10">
            <div className="col-span-8 grid w-full">Projects</div>
            <section className="col-span-2"></section>
        </div>
    );
}
