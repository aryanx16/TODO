import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function(){
    const { isLogin, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate()
    // useEffect(()=>{console.log(isLogin)})
    return(
        <>
        <div className="bg-slate-950 p-4">

        <div className='bg-slate-950 font-mono text-sky-500 flex justify-between sm:px-10 text-2xl sm:text-3xl mb-5 '>
        <div className="hover:text-sky-300 cursor-pointer" onClick={()=>{navigate("/home")}}>aryan</div>
        {isLogin?<div onClick={handleLogout } className="register cursor-pointer hover:text-sky-300" >Logout</div>:
        <div className='flex gap-4'>
            <div className="register pb-1 cursor-pointer border-b-2 border-slate-950  hover:text-sky-300" onClick={()=>{navigate("/register")}}>
                Register
            </div>
            <div className="register cursor-pointer hover:text-sky-300" onClick={()=>{navigate("/login")}}>
                Login
            </div>
        </div>
        }
    </div>
        </div>
        </>
    )
}