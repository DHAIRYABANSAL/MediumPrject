import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Navbar } from "../components/Navbar"

export const Publish = () => {

    const[title,setTitle] = useState("")
    const[description,setDescription] = useState("")
    const navigate = useNavigate()

    const publishArticle = () => {
        axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title : title,
            content : description,
        },{
            headers : {
                authorization : localStorage.getItem("token")
            }
        }).then(res => {
            if(res.data.createdBlog.id){
                navigate(`/blog/${res.data.createdBlog.id}`)
            }
        })
    }
    return <div>
        <Navbar/>
        <div className="w-full ml-5 mt-5">
        <div className="flex justify-center">
            <div className="w-7/12">
                <input onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-100 border border-gray-600 text-slate-900 text-sm rounded-lg  w-full p-2.5 d" placeholder="Title" required />
            </div>
        </div>
        <div className="pt-10">
            <div className="flex justify-center">
                <div className="flex justify-center w-7/12  mb-4 border border-gray-200 rounded-lg bg-gray-50">


                    <textarea onChange={(e) => setDescription(e.target.value)} id="editor" rows={8} cols={100} className=" px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="Write an article..." required ></textarea>

                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={publishArticle} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
                    Publish post
                </button>
            </div>
        </div>



    </div>
    </div>
}