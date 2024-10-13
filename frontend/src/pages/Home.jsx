import { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from "axios"
import { CardSpotlight } from '../components/spotlight'
import { Input } from '../components/input'
import Navbar from '../components/Navbar'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../context/authcontext'
import Skeleton from '../components/Skeleton'
export default function () {
    const BACKEND_URL =import.meta.env.VITE_BACKEND_URL
    const { isLogin } = useContext(AuthContext)
    const [todos, settodos] = useState([])
    const [newtodo, setnewtodo] = useState("")
    const [editId, seteditId] = useState(null)
    const [load,setload] = useState(true)
    const [editValue, seteditValue] = useState("")
    const [token, settoken] = useState(localStorage.getItem("token"))
    useEffect(() => {
        const tokennn = localStorage.getItem("token")
        settoken(tokennn);
        // console.log(isLogin)
        //  axios.get(`${BACKEND_URL}`).then(respp=>{console.log(respp)})
        if(token){try {
            axios.get(`${BACKEND_URL}/todos`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token as a Bearer token
                },
                withCredentials:true,
            })
                .then(response => {
                    // console.log(response);
                    if(response.status===200){
                        settodos(response.data)
                        setload(false)
                    }else{
                        toast.error(response.data.message)
                    }
                })
        }catch(e){
            toast.error(e.response.data.message)
        }}else{
            console.log("NO TOKEN FOUND ! PLEASE LOGIN TO CONTINUE")
        }
    }, [isLogin])
    async function handlecheck(id, currentstate) {
        try{

            const response = await axios.put(`${BACKEND_URL}/todo/${id}`, { isCompleted: currentstate }, { headers: { Authorization: `Bearer ${token}` } })
            // console.log(response)
            const updatedtodo = todos.map(todo => (
                todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            ))
            // console.log(todos);
            settodos(updatedtodo)
        }catch(e){
            toast.error("Error!")
        }
        // console.log(updatedtodo)

    }
    async function addtodo() {
        try {
            const response = await axios.post(`${BACKEND_URL}/todo`, { todo: newtodo },
                { headers: { Authorization: `${token}` } }
            )
            setnewtodo("")
            if (response.status === 200) {
                toast.success(response.data.message)

                settodos([...todos, response.data.todo])
                // console.log(response.statusText==='OK')
            }
        } catch (e) {
            // console.log(e)
            // console.log(e.response.data.message)
            toast.error(e.response.data.message)

        }


        //   toast.success("dfjdkf")

    }
    async function handledelete(id) {
        try {

            const response = await axios.delete(`${BACKEND_URL}/todo/${id}`, { headers: { Authorization: `${token}` }})
            if (response.status === 200) {
                // console.log("before fileter")
                settodos(todos.filter(todo => (todo._id !== id)))
                // console.log("after fileter")
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (e) {
            toast.error(e.response.data.message)
        }

    }
    async function handleedit(id) {
        seteditId(id)
        const todoToEdit = todos.find(todo => todo._id === id)
        seteditValue(todoToEdit.todo)  // Set the current value in the input
    }

    async function saveEdit(id) {
        try {

            const response = await axios.put(`${BACKEND_URL}/todo/${id}`, { updatedTodo: editValue, }, { headers: { Authorization: `Bearer ${token}` }})
            if (response.status === 200) {

                const updatedTodos = todos.map(todo =>
                    todo._id === id ? { ...todo, todo: editValue } : todo
                )
                settodos(updatedTodos)
                seteditId(null)  // Exit edit mode
                seteditValue("") // Clear the input
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
    return (
        <div className='bg-slate-950'>
            {/* <ToastContainer/> */}
            <Navbar />
            <div className='font-mono z-20 bg-slate-950 min-h-screen'>
                <div className='flex justify-center items-center text-8xl font-bold font-sans text-sky-600'>TO-DO</div>
                <div className='w-screen flex justify-center items-center mt-10'>

                    <Input className='text-sky-500 border-2 border-sky-500 text-xl min-w-80 sm:min-w-[400px] md:min-w-[600px] bg-neutral-800' type="text" onChange={(e) => { setnewtodo(e.target.value) }} />
                    <button className='hover:bg-sky-600 hover:border-neutral-700 font-semibold rounded-md transition-all duration-700 hover:text-black border ml-2 border-sky-700 px-3 py-1 text-sky-400' onClick={addtodo}>Add</button>
                </div>
                <div className=' flex flex-col  items-center justify-center'>
                    {isLogin ? <>
                {load? <><Skeleton/><Skeleton/><Skeleton/><Skeleton/><Skeleton/></>:<>
                        {todos.map(todo =>
                        (
                            
                            <div key={todo._id} className='transition-all p-2   w-96 md:w-[700px] sm:w-[600px] duration-1000  text-sky-400 font-mono  z-20 border-b-2 border-sky-400' >

                                {
                                    editId === todo._id ? (
                                        // Edit mode: show input for editing
                                        <>
                                            <Input
                                                type="text"
                                                className='text-sky-500 border-2 border-sky-500 text-xl min-w-80 sm:min-w-[400px] md:min-w-[600px] bg-neutral-800'
                                                value={editValue}
                                                onChange={(e) => seteditValue(e.target.value)}
                                                />
                                            <button className=' hover:bg-sky-600 hover:border-neutral-700 font-semibold rounded-md transition-all duration-500 hover:text-black border  border-sky-700 px-3 py-1 text-sky-400 mt-2 ml-8' onClick={() => saveEdit(todo._id)}>Save</button>
                                        </>
                                    ) : (
                                        <>
                                            {/* <CardSpotlight className="transition-all duration-1000"> */}
                                            <div className='relative z-20 text-3xl sm:text-5xl'>

                                                <input type="checkbox" className='w-5 mr-4 h-5 bg-black  checked:bg-sky-600 rounded-md accent-sky-600' onChange={() => { handlecheck(todo._id, todo.isCompleted) }} checked={todo.isCompleted} />

                                                <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                                                    {todo.todo}
                                                </span>
                                            </div>
                                            <div className='sm:ml-7'>

                                                <button className='relative z-20 hover:bg-sky-600 hover:border-neutral-700 font-semibold rounded-md transition-all duration-700 hover:text-black border ml-2 border-sky-700 px-3 py-1 text-sky-400 m-2' onClick={() => { handleedit(todo._id) }}  >Edit</button>
                                                <button className='relative z-20 hover:bg-sky-600 hover:border-neutral-700 font-semibold rounded-md transition-all duration-500 hover:text-black border ml-2 border-sky-700 px-3 py-1 text-sky-400' onClick={() => { handledelete(todo._id) }}>Delete</button>
                                            </div>
                                            {/* </CardSpotlight> */}
                                        </>
                                    )}
                            </div>
                        )
                    )}
                    </>}
                    </> : <><div className='text-sky-300'>(Login to use)</div> </>}
                </div>
                {/* <input type="text" placeholder='Todo' /> */}
            </div>
        </div>
    )
}