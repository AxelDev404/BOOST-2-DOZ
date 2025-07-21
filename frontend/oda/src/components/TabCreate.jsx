
import React, { useEffect, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';




function TabCreate(){

    const [titolo , setTitolo] = useState('');
    const [contenuto , setContenuto] = useState('');
    const [scadenza , setDataFormattata] = useState('');

    const [shared , setShared] = useState(null);

    const token_access = localStorage.getItem('access');
   

    function CreateTask(e)
    {
        e.preventDefault()

        if(!titolo || !contenuto || !scadenza){
         alert('mancano dei dati')
            
         return;
        }
       

        fetch
        (
            'api/post_tsk/',
            {
                method : 'POST',
                headers : {
                
                    'Content-Type':'application/json' ,
                    
                    'Authorization': `Bearer ${token_access}`,
                } ,

                body : JSON.stringify({titolo , contenuto , scadenza:new Date(scadenza).toISOString().split('T')[0] , shared:shared})
            }

        )
        .then(res =>
            {
                if(!res.ok){
                    throw new Error('Qualcosa e andato storto' )
        
                }
                return res.json()
            }
        )
        .then(
            data => 
            {
                setTitolo('');
                setContenuto('');
                setDataFormattata('');
                //window.location.reload();
            }
        ) 
        .catch(err => console.log(err.message))

    }




    return(

        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            {/* Header con effetto glow */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-wide">
                    ADD TASK
                </h1>
                <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-80"></div>
            </div>

            {/* Form container con glass effect */}
            
            <div className="max-w-md mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700 p-8">
                <form onSubmit={CreateTask} className="space-y-6">
                    {/* Titolo Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Titolo
                        </label>
                        <div className="relative">
                            <input
                                value={titolo}
                                onChange={e => setTitolo(e.target.value)}
                                type="text"
                                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Task title"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Contenuto Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Contenuto
                        </label>
                        <textarea
                            value={contenuto}
                            onChange={e => setContenuto(e.target.value)}
                            className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                            placeholder="Task description"
                        />
                    </div>

                    {/* Scadenza Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Scadenza
                        </label>
                        <div className="relative">
                            <input
                                value={scadenza}
                                onChange={e => setDataFormattata(e.target.value)}
                                type="date"
                                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                            />

                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Condividi (ID utente)
                        </label>
                        <div className="relative">
                            <input
                                value={shared}
                                onChange={e => setShared(Number(e.target.value))}
                                type='number'
                                className="block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Id utente"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}

                    <div className="pt-4">

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                            <FileUploadIcon sx={{ fontSize: 24 }} />
                            <span>Add Task</span>
                        </button>

                    </div>

                </form>

            </div>

        </div>


    );
}

export default TabCreate;