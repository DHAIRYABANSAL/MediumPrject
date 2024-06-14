import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { BlogCom } from "../components/BlogCom";
import { Navbar } from "../components/Navbar";




export const FullBlog = () => {

    const {id} = useParams();
    const{loading,blog} = useBlog({
        id : id || ""
    })

    if(loading){
        return <div>
            loading...
            </div>
    }
    return <div>
        <Navbar/>
        <BlogCom blog={blog}/>
    </div>
}