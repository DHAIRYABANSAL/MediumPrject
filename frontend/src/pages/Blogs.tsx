import { BlogCard } from "../components/BlogCard"
import { Navbar } from "../components/Navbar"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    
    const {loading,blogs} = useBlogs()

    if(loading)
        {
            return <div>loading...</div>
        }


    return <div>
        <Navbar/>
        <div className="flex justify-center">
            <div className="w-full">
                {blogs.length>0 && blogs.map(blog => <BlogCard 
                   author={blog.author.name || "Dhairya Bansal"}
                   title = {blog.title}
                   content = {blog.content}
                   date = "June 13,2024"
                   id = {blog.id}
                />)}
            </div>
        </div>
    </div>
}