import { Input } from "../components/input";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/authcontext";
import { Hourglass, MutatingDots, ThreeCircles } from "react-loader-spinner";
export default function (){
    const navigate = useNavigate()
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    // const [getuser,setgetuser] = useState(false);
    // const BACKEND_URL = "https://todobxccc.vercel.app"
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    const { isLogin, handleLogout ,handleLogin } = useContext(AuthContext);
    const [showloader , setshowloader] = useState(false)
    async function handleloginn(){
        try{
            setshowloader(true);
            const response = await axios.post(`${BACKEND_URL}/login`,{username,password},)
            // console.log(response.status);
            if(response.status===200){
                localStorage.setItem("token",response.data.token)
                toast.success(response.data.message)
                handleLogin();
                setshowloader(false);
                // console.log("logged in .. login page")
                navigate("/")
            }else{
                setshowloader(false);
                toast.error(response.data.message)
            }
        }catch(e){
            setshowloader(false);
            if (e.response && e.response.data) {
                toast.error(e.response.data.message);
            } else {
                toast.error("Something went wrong, please try again.");
            }
    
        }
    }
    return(
        <div className="bg-slate-950 min-h-screen w-screen font-mono">
            <Navbar/>
           <div className="w-screen mt-40  flex justify-center items-center">
                <div className=" border border-sky-700 hover:shadow-md transition-all duration-700 p-4  sm:p-7 rounded-3xl backdrop-blur-lg">
                    <div className="text-7xl mb-2 sm:mb-0 text-sky-500 font-mono font-bold w-full text-center">
                        Login
                    </div>
                    <div className=" flex flex-col justify-center items-center gap-4">
                        <div>
                        <span className="text-sky-500">Username</span>
                        <Input place="Username" onChange={(e)=>{setusername(e.target.value)}}  type="text" className="text-sky-500 border-2 border-sky-500 text-xl w-72 sm:w-96  transition-all duration-700 hover:bg-neutral-850  bg-neutral-900  "></Input>
                        </div>
                        <div>
                        <span className="text-sky-500">Password</span>
                        <Input place="Password"  onKeyDown={(e)=>{
                                if(e.key=='Enter'){
                                    handleloginn()
                                }
                            }}  onChange={(e)=>{setpassword(e.target.value)}}   type="text" className="text-sky-500 border-2 border-sky-500 text-xl w-72 sm:w-96  transition-all duration-700 hover:bg-neutral-850  bg-neutral-900  "></Input>
                        </div>
                        <div>
                            <button onClick={handleloginn} className="bg-sky-400 w-72 sm:w-96 p-1 rounded-lg flex justify-center items-center hover:bg-sky-300 font-semibold text-xl">Login {showloader &&  <Hourglass
  visible={true}
  height="20"
  width="20"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#000000', '#000000']}
  />}</button>
                   
                        </div>
                       
                        
                    </div>
                </div>
           </div>
        </div>
    )
}