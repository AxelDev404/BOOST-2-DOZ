import React, { useEffect, useState } from 'react';

function TabShare(){

    const token_access = localStorage.getItem('access');

    const [task , setTask] = useState([]);

    useEffect(()=>{
        
        fetch(
        
            'api/shared_tsk/',

            {

                headers : {
                    //'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token_access}`,
                }

            }
        
        )
        .then(res=> res.json())
        .then(data => setTask(data))
        .catch(err => console.log(err.message))

    },[]);



    return (

        <div className="w-full grid grid-cols-1 md:grid-cols-4 md:gap-y-6 gap-y-3 px-3 md:px-10">
            <div className="bg-sla h-8 md:h-12 md:col-span-4"></div>
            
            {Array.isArray(task) && task.map(task => (

                <div key={task.id_task} class="w-full md:w-5/6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                    <div class="flex flex-col p-6 space-y-4">
                       

                        <div class="bg-gradient-to-r flex from-indigo-900 to-purple-900 rounded-lg px-4 py-3 shadow-inner text-2xl font-semibold text-white tracking-wide">

                  
                            <h1 >
                                {task.titolo}
                            </h1>
                  
                        </div>
                        
                      
                        <div class="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
                            <span class="text-lg text-gray-300 font-medium">To do:</span>
                            
                            <div className='"mt-1 text-gray-200'>

                                    <h1 >
                                        {task.contenuto}
                                    </h1>
                            
                                 
                            
                            
                            
                            </div>
                            
                           
                        </div>
                        
                        
                        <div  class="flex flex-col space-y-3">
                            <div class="flex items-center text-gray-400">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-sm font-medium">Scadenza: <span class="text-gray-300">
                                                                     
                                    <h1 >
                                        {task.data_formattata}
                                    </h1>
                      
                                </span></span>

                            </div>
                            
                            <div class="flex items-center">
                                
                                {task.stato ? (
                                    <div class="flex items-center text-green-400">
                                        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-sm font-medium">Completato</span>
                                    </div>
                                ) : (
                                    <div class="flex items-center text-red-400">
                                        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-sm font-medium">In sospeso</span>
                                    </div>
                                )}


                            </div>

                        </div>
                    </div>
                </div>


            ))}

           

        </div>

    );

}


export default TabShare;