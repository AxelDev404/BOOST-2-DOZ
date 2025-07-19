import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LOGOAX.png';

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
            navigate('/dashboard')
        }
        else{
            navigate('/')
        }

    };
 

    return(

        <div className="min-h-screen bg-black flex flex-col">
          
            <div className='flex items-center justify-center gap-4 text-white text-7xl py-6 sticky top-0 z-50 bg-black border-b border-gray-800 '>
                <span className='font-thin'>BOOST-2-DO</span>
                <img 
                    src={logo} 
                    alt="Logo" 
                    className='h-20 w-20 rounded-full border-2 border-blue-500 object-cover'
                />
            
            </div>
            
          
            <div className="flex flex-1 items-center justify-center bg-black p-4 sticky">
                
                <div className="bg-black p-8 rounded-xl w-full max-w-md border-b-2 border-t-2 border-white shadow-lg">
                    
                    <form onSubmit={hanleLogin} className="flex flex-col gap-4">
                       
                        <div className="text-center">
                            <h1 className="text-white font-thin text-4xl mb-6">LOGIN</h1>
                        </div>

                        <div className="flex flex-col gap-1">
                        
                            <label htmlFor="username" className="text-white text-lg font-light">Username</label>
                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" className="px-4 py-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                        
                        </div>

                        <div className="flex flex-col gap-1">
                        
                            <label htmlFor="password" className="text-white text-lg font-light">Password</label>
                            <input value={password}  onChange={e => setPassword(e.target.value)}   type="password"  id="password"  className="px-4 py-3 rounded-md bg-white text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
                        
                        </div>

                        <div className="md:flex md:flex-row md:justify-between md:pt-4">
                        
                            <button  type="submit" className="md:px-6 md:py-2 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-72 md:w-40">
                                LogIn
                            </button>
                            
                            <div className='py-2'></div>
                            

                            <button  type=''  className="md:px-6 md:py-2 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all w-72 md:w-40" >
                                Register
                            </button>

                        </div>

                        <div className='text-center'>

                            <span className='font-thin text-lg text-white'>An AxelDev404 solution ©</span> <br />v 
                            <a href="https://github.com/AxelDev404" target='blank' className='text-white font-thin text-sm'>github.com/AxelDev404</a>

                        </div>
                        
                        
                    </form>
                
                </div>
            
            </div>
        
        </div>
      

    );

}

export default LogIn;