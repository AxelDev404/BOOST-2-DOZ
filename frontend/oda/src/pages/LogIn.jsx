import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LogIn(){

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const navigate = useNavigate();


    const hanleLogin = async (e) =>{

        e.preventDefault()

        const res = await fetch
        (

            'auth/token/',
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({username:username , password : password})
            }
            
        )

        const data = await res.json();

        if(res.ok){

            localStorage.setItem('access' , data.access);
            localStorage.setItem('refresh' , data.refresh);
            alert('accesso consentito')
            navigate('/dashboard')
        }
        else{
            alert('credenziali errate')
        }

    };
 

    return(

        <div className="min-h-screen bg-gray-900">

            <div className="flex items-center justify-center min-h-screen bg-gray-900">

                <div className="bg-slate-800 p-8 rounded-xl w-96 border-b-2 border-t-2  border-blue-700">
                    <form onSubmit={hanleLogin} className="flex flex-col gap-4">

                        <div className="text-center">

                            <h1 className="text-white font-thin text-2xl">LOGIN</h1>

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-white mb-1">Username</label>
                            <input value={username} onChange={e => setUsername(e.target.value)}  type="text" id="username" className="px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-white mb-1">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)}  type="password" id="password" className="px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div className="flex flex-row">

                            <div>
                                <button className="px-3 w-44 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-800">LogIn</button>
                            </div>

                            <div className="px-2"></div>

                            <div>

                                <button type='submit' className="px-3 w-32 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-800">Register</button>
                            </div>

                        </div>

                    
                    </form>
                </div>
            </div>





        </div>

      

    );

}

export default LogIn;