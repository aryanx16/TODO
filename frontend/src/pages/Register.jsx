import { useDispatch, useSelector } from "react-redux";
import { Input } from "../components/input";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function (){
   const navigate = useNavigate();
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function handleregister(){
        try{

            const response = await axios.post(`${BACKEND_URL}/register`,{username,password},{withCredentials:true,})
            if(response.status===200){
                toast.success(response.data.message)
                console.log(response.data);
                navigate("/login")
            }else{
                toast.error(response.data.message)
            }
        }catch(e){
            return toast.error(e.response.data.message)
        }
        
    }
    return(
        <div className="bg-slate-950 min-h-screen w-screen font-mono">
            <Navbar/>
           <div className="w-screen mt-56  flex justify-center items-center">
                <div className=" border border-sky-700 hover:shadow-md transition-all duration-700  p-7 rounded-3xl backdrop-blur-lg">
                    <div className="text-7xl text-sky-500 font-mono w-full text-center">
                        Register
                    </div>
                    <div className=" flex flex-col justify-center items-center gap-4">
                        <div>
                        <span className="text-sky-500">Username</span>
                        <Input place="Username" onChange={(e)=>{setusername(e.target.value)}}  type="text" className="text-sky-500 border-2 border-sky-500 text-xl w-80 sm:w-96  transition-all duration-700 hover:bg-neutral-850  bg-neutral-900  "></Input>
                        </div>
                        <div>
                        <span className="text-sky-500">Password</span>
                        <Input place="Password" onChange={(e)=>{setpassword(e.target.value)}}   type="text" className="text-sky-500 border-2 border-sky-500 text-xl w-80 sm:w-96  transition-all duration-700 hover:bg-neutral-850  bg-neutral-900  "></Input>
                        </div>
                        <div>
                            <button onClick={handleregister} className="bg-sky-400 w-80 sm:w-96 p-1 rounded-lg hover:bg-sky-300 font-semibold text-xl">Register</button>
                        </div>
                       
                        
                    </div>
                </div>
           </div>
        </div>
    )
}