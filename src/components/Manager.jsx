import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuivd4} from 'uuid'

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const copyText= (text)=>{
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text);
    }

    const SavePassword = () => {
        
            setPasswordArray([...passwordArray,{...form,id:uuivd4()}]);
            localStorage.setItem("password", JSON.stringify([...passwordArray,{...form,id:uuivd4()}]))
            console.log([...passwordArray, form])
            setform({site:"",username:"",password:""});
            toast('🦄 Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    }

    const deletePassword = (id) => {
        toast('🦄 Password Deleted Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        let c = confirm("Do you really want to delete this password!")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords",JSON.stringify(passwordArray,filter(item=>item.id !== id)))
        }
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    return (
        <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
{/* Same as */}
<ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full 
                bg-green-50 
                bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
                bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full 
                bg-green-400 opacity-20 blur-[100px]">
                </div></div>
            <div className=" pt-7 mycontainer min-h-[88.2vh] ">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span><span className='text-green-500'>Op/&gt;</span>
                </h1>
                <p className='text-green-900 text-center  text-lg '>Your Own Password Manager</p>

                <div className=' text-black items-center flex flex-col p-4 gap-8 '>
                    <input value={form.site} onChange={handleChange} className='rounded-full border  border-green-400 p-4 py-1 w-full' placeholder='Enter Website URL' type="text" name="site" id="site" />
                    <div className="flex  flex-col md:flex-row w-full justify-between gap-8">
                        <input onChange={handleChange} name="username" placeholder='Enter User Name' value={form.username} type="text" className='w-full p-4 py-1 border border-green-500 rounded-full' id='username'/>
                        <div className="relative">

                            <input ref={passwordRef} onChange={handleChange} id='' name='password' type="password" value={form.password} placeholder='Enter Password' className='w-full p-4 py-1 border border-green-500 rounded-full' />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img className='p-1' ref={ref} width={30} src="icons\eye.png" alt="" />

                            </span>
                        </div>
                    </div>
                    <button onClick={SavePassword} className='flex justify-center gap-4 items-center bg-green-500 rounded-full px-8 py-2 w-fit
                        hover:bg-green-600 border hover:bg-green-300 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length == 0 &&
                        <div>
                            No Your Passwords to Show
                        </div>
                    }
                    {passwordArray.length != 0 &&
                        <table className=" mb-10 table-auto w-full bg-green-100 rounded-xl overflow-hidden ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>User Name</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='' >
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer lordiconcopy' onClick = {()=>{copyText(item.site)}} >
                                                <lord-icon className={"cur"}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>{()=>{copyText(item.username)}}
                                            </div>

                                        </td>
                                        <td className='  py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                        <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer lordiconcopy' onClick ={()=>{copyText(item.username)}} >
                                                <lord-icon 
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                            </div>
                                        </td>
                                        <td className='   py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                        <span>{item.password}</span>
                                            <div className='size-7 cursor-pointer lordiconcopy' onClick = {()=>{copyText(item.password)}} >
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border border-white text-center '>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}} >
                                            <lord-icon
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger = "hover"
                                            
                                            ></lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1 'onClick={()=>{deletePassword(item.id)}} >
                                            <lord-icon
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger = "hover"
                                            
                                            ></lord-icon>
                                        </span>
                                        </td>
                                    </tr>

                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>

    )
}

export default Manager
