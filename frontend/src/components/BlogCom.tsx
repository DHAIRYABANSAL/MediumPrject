import { Blog } from "../hooks"
import { Avatar } from "./Avatar"

export const BlogCom = ({ blog }: { blog: Blog | null }) => {
    return <div className="p-10 grid grid-cols-12 px-10 w-full ">
        <div className="col-span-8 ">
            <div className="font-bold text-4xl">
                {blog!.title}
            </div>
            <div className="text-slate-500 pt-2 pb-4">
                Posted on June 13,2024
            </div>
            <div>
                {blog!.content}
            </div>
        </div>
        <div className="col-span-4 invisible lg:visible">
            <div className="pl-4">
                Author
            </div>
            <div className="flex ">
                <div className="pt-4">
                    <Avatar name={blog?.author?.name?.toUpperCase()} />
                </div>
                <div className="p-5">
                    <div className="font-bold text-xl">
                        {blog?.author.name.toUpperCase() || "Anonymous"}
                    </div>
                    <div className="text-slate-600">
                        random phrase describing author to catch the users attention
                    </div>
                </div>
            </div>

        </div>
    </div>
}