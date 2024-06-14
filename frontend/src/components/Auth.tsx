import { Link, useNavigate } from "react-router-dom"
import { LabelInput } from "./Labelinput"
import { useState } from "react"
import { SignupInput } from "@100xdevs/medium-common"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({type} : {type: "signup" | "signin"}) => {

    const[signUpInputs,setSignUpInputs] = useState<SignupInput>({
        username : "",
        name : "",
        password : ""
    })

    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,signUpInputs)
            const jwt = response.data.jwt
            console.log(response.data.jwt)
            if(!jwt)
                {
                    alert("incorrect credentials")
                    return;
                }
            console.log(response.data)
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch(e){
            alert(e.message)
        }
    }

    return <div className="flex flex-col justify-center h-screen">
        <div className="font-bold text-3xl text-center">
            {type == "signup"?"Create an account":"Log In"}
        </div>
        <div className="text-center text-slate-600 mt-2">
            {type == "signup"?"Already have an account?":"Don't have an account?"  }
            <Link className = "pl-2 underline" to={type == "signup"?"/signin":"/signup"}>
                {type == "signup"?"Login":"Sign up"}
            </Link>
        </div>
        {type == "signup" && <div>
            <LabelInput label="FirstName" placeholder="Dhairya Bansal" onChange={(e : any) => {
                setSignUpInputs({
                    ...signUpInputs,
                    name : e.target.value
                })
            }}/>
        </div>}
        <div>
            <LabelInput label="Email" placeholder="D@gmail.com" onChange={(e : any) => {
                setSignUpInputs({
                    ...signUpInputs,
                    username : e.target.value
                })
            }}/>
        </div>
        <div>
            <LabelInput label="Password" placeholder="" onChange={(e : any) => {
                setSignUpInputs({
                    ...signUpInputs,
                    password : e.target.value
                })
            }}/>
        </div>
        <div>
            <Button type={type} onClick={sendRequest}/>
        </div>
    </div>
}