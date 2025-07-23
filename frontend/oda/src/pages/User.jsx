import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function User(){

    const token_access = localStorage.getItem('access');
    const [usr , setUsr] = useState('');

    const navigate = useNavigate();

    const [old_password , setOldPassword] = useState('');
    const [confirm_password , setConfirmPassword] = useState('');
    const [new_password , setNewPassword] = useState(''); 

    useEffect(() => {

        fetch
        (

            'api/myprofile/', 
            {
                headers: {
                    'Authorization' : `Bearer ${token_access}`,
                }
            }

        )
        .then(res => 
            {
                if(!res.ok){
                    throw new Error('Qualcosa è andato storto')
                }
                return res.json();
            }
        )
        .then(data => setUsr(data))
        .catch(err => console.log(err.message))

    },[]);


    const backdash =()=>{
        navigate('/dashboard');
    }


    function ChangePwd(e){
        e.preventDefault();

        if(confirm_password !== new_password){
            alert('Le nuove password non coincidono')
        }
        else if(old_password == '' || new_password == '' || confirm_password == ''){
            alert('assicurati di aver compilato tutti i campi')
            navigate('/user')
        }
        else {

            fetch
            (

                'api/change_password/',
                
                {
                    method : 'PATCH',
                    
                    headers:
                    {  
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token_access}`,
                    },

                    body : JSON.stringify({old_password:old_password , new_password:new_password , confirm_password:confirm_password})
                }

            )
            .then(data => 
                {
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('')
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    navigate('/')
                }

            )
            .catch(err => console.log(err.message))
        }

    }



    return(

       <div className="bg-black w-full  p-4 shadow-sm min-h-screen">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
                
                <div className="bg-gradient-to-r  from-indigo-900 to-purple-900 p-6 rounded-lg border border-gray-700">
                <div className="flex flex-col items-center">
                    <div className="mb-4">
              
                    <p className="font-medium text-white text-center">@{usr?.username}</p>
                    <p className="text-sm text-gray-400 text-center">Registrato il {usr?.date_joined}</p>
                    </div>
                </div>
                </div>

                {/* Sezione Cambio Password */}
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6">Cambia Password</h2>

                    <form action="" onSubmit={ChangePwd}>
                        <div className="space-y-4">
                            <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password attuale</label>
                            <input 
                                value={old_password}
                                onChange={e=>setOldPassword(e.target.value)}
                                type="password" 
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Inserisci la password attuale"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nuova password</label>
                            <input 
                                value={new_password}
                                onChange={e => setNewPassword(e.target.value)}
                                type="password" 
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Inserisci la nuova password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Conferma nuova password</label>
                            <input 
                                value={confirm_password}
                                onChange={e => setConfirmPassword(e.target.value)}
                                type="password" 
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Conferma la nuova password"
                            />
                        </div>

                        <div className="pt-2">
                            <button type='submit' className="w-full bg-gradient-to-r  from-indigo-900 to-purple-900 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                                Cambia Password
                            </button>
                            </div>
                        </div>




                    </form>


                        <div className="mt-6">
                            
                            <button onClick={backdash} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                            
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                    Torna alla Home
                            </button>
                        
                        </div>
                    
                </div>
            </div>
        </div>
    );


}

export default User;