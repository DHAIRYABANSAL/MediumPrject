import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps{
    author : string,
    title : string,
    content : string,
    date : string,
    id : string
}

export const BlogCard = ({
    author,
    title,
    content,
    date,
    id
} : BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="ml-10 max-w-screen-md cursor-pointer border-b border-slate-600">
        <div className="flex">
            <Avatar name= {author}/>
            <div className="font-medium text-slate-700 text-sm flex flex-col justify-center pt-3 pl-3">
                {author}
            </div>
            <div className="pt-2 flex flex-col - justify-center pl-2">
            &#183;
            </div>
            <div className="pt-3 pl-2 text-xs font-semibold text-slate-400  text-center flex flex-col justify-center">
                {date}
            </div>
        </div>
        <div className="font-bold pt-3 pl-3">
            {title}
        </div>
        <div className="pl-3 font-light text-md text-slate-600 ">
            {content.slice(0,200) + "..."}
        </div>
        <div className="pl-3 pt-3 font-light text-sm text-slate-400">
            {`${Math.ceil(content.length/100)} min read`}
        </div>
        
    </div>
    </Link> 
}