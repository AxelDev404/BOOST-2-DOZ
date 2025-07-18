
import React, { useEffect, useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Popup from 'reactjs-popup';

import EditIcon from '@mui/icons-material/Edit';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

function TabToDo(){

    const [task , setTask] = useState([]);
    const [stato , setStato] = useState(false);
    const [ref , setRef] = useState([]);

    const token_access = localStorage.getItem('access');    

    const [id_task , setIdTask] = useState(0);


    const [titolo , setTitolo] = useState('');
    const [contenuto , setContenuto] = useState('');
    const [scadenza , setData] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [isEditing2, setIsEditing2] = useState(false);
    const [isEditing3, setIsEditing3] = useState(false);




    const [isClikced , setIsClicked] = useState(false);

    useEffect(()=>{

        fetch(
            'api/tasks/', 
            {

                headers : {
            
                    'Authorization' : `Bearer ${token_access}`,
                }
               
            }
        )
        .then(res => 
            {
                if(!res.ok){
                    throw new Error('Qualcosa e andato storto')
                }
                return res.json()
            }
        )
        .then(
            data => 
            {
                setTask(data)
              
            }
        )
        .catch(err => console.log(err.message))

    },[]);

 
    
    const Refresh_2 =()=>{

        
        fetch(
            'api/tasks/',

            {
                headers : 
                {
                    'Authorization' : `Bearer ${token_access}`,

                }

            }
        )
        .then(res => res.json())
        .then(data => setRef(data))
        .catch(err => console.log(err.message))

   

    }

   
    useEffect(()=>{
        Refresh_2();
    },[]);


    const del_tks = (id_task) =>
    {

       
        

        fetch(
            `api/delete_tks/${id_task}/`,

            {
                method:'DELETE',
                headers :      
                {
                    'Authorization' : `Bearer ${token_access}`,
                },
                
            }

        )
        .then(res=>
            {
                
                if(!res.ok){
                
                    throw new Error('Qualcosa e andato storto')
                
                }
          
                
                return res.json();

            }
        )
        .catch(err=>console.log(err.message))

    };


    

    const ChangeStatus = (id_task) =>
    {

        //in caso di errori provare direttamente nel onClick event

        fetch(
            `api/change_status_task/${id_task}/`,
            {
                method : 'PATCH',

                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token_access}`,
                },
                
                body : JSON.stringify({stato:true})

            }   
        )
        .then(res=> 
            {
                if(!res.ok){
                    throw new Error('Qualcosa e andato storto')
                }
                return res.json();
            }
        )
        .catch(err => console.log(err.message))
    }



    const handleBlur = () => {
        setIsEditing(false);

    };


    const handleBlur_2 = () => {
        setIsEditing2(false);
  
    };

    const handleBlur_3 = () => {
        setIsEditing3(false);
  
    };

    const payload = {};
    
    if(titolo.trim() !== '')payload.titolo = titolo
    if(contenuto.trim() !== '')payload.contenuto = contenuto;
    if(scadenza.trim() !== '')payload.scadenza = new Date(scadenza).toISOString().split('T')[0];
    

    const modify_task = (id_task) =>
    {

        fetch(
            
            `api/patch_tsk/${id_task}/`,
            {
                method : 'PATCH',

                headers: {
                    
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token_access}`,
                },

                body : JSON.stringify(payload)

            }
        
        )
        .then(res => 
            {
                if(!res.ok){
                    throw new Error('Qualcosa e andato storto')
                }
                return res.json();
            }
        )
        .catch(err => console.log(err.message))
        

    }


    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-4 md:gap-y-6 gap-y-3 px-3 md:px-10">
            <div className="bg-sla h-8 md:h-12 md:col-span-4"></div>
            
            {Array.isArray(task) && task.map(task => (

                <div key={task.id_task} class="w-full md:w-5/6 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-600">
                    <div class="flex flex-col p-6 space-y-4">
                       

                        <div class="bg-gradient-to-r flex from-indigo-900 to-purple-900 rounded-lg px-4 py-3 shadow-inner text-2xl font-semibold text-white tracking-wide">

                            {isEditing ? (
                                <input
                                    value={titolo}
                                    onChange={(e) => setTitolo(e.target.value)}
                                    

                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                        handleBlur();
                                        }
                                    }}
                                    autoFocus
                                    className='bg-gradient-to-r flex from-indigo-900 to-purple-900 border-none w-full'
                                />
                                ) : (
                                <h1 onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                                    {task.titolo}
                                </h1>
                            )}
                                                 
                        </div>
                        
                      
                        <div class="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
                            <span class="text-lg text-gray-300 font-medium">To do:</span>
                            
                            <div className='"mt-1 text-gray-200'>
                                
                                
                                {isEditing2 ? (
                                    <input
                                        value={contenuto}
                                        onChange={(e) => setContenuto(e.target.value)}
                                        

                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                            handleBlur_2();
                                            }
                                        }}
                                        autoFocus
                                        className='bg-gray-800  text-white w-full'
                                    />
                                    ) : (
                                    <h1 onClick={() => setIsEditing2(true)} style={{ cursor: 'pointer' }}>
                                        {task.contenuto}
                                    </h1>
                                )}
                                 
                            
                            
                            
                            </div>
                            
                           
                        </div>
                        
                        
                        <div class="flex flex-col space-y-3">
                            <div class="flex items-center text-gray-400">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-sm font-medium">Scadenza: <span class="text-gray-300">
                                    
                                    {isEditing3 ? (
                                        <input
                                            value={scadenza}
                                            onChange={(e) => setData(e.target.value)}
                                            

                                            type='date'

                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleBlur_3();
                                                }
                                            }}
                                            autoFocus
                                            className='bg-white  text-black'
                                        />
                                        ) : (
                                        <h1 onClick={() => setIsEditing3(true)} style={{ cursor: 'pointer' }}>
                                            {task.data_formattata}
                                        </h1>
                                    )}
                                
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

                            <div>
                                <div className='py-2'></div>
                                <button onClick={() => del_tks(Number(task.id_task) , window.location.reload())}>
                                
                                    <DeleteIcon sx={{color:'red'}}/>
                                    <span className='px-2 text-red-600 font-medium'>Cancella</span>
                                </button>
                                
                                <div className='py-2'></div>
                                
                                <button onClick={() =>modify_task(Number(task.id_task) , window.location.reload())}>
                                
                                    <EditIcon sx={{color:'green'}}/>
                                    <span className='px-2 text-green-600 font-medium'>Modifica</span>
                                </button>

                                <button onClick={() => window.location.reload()}>
                                    <ReplyAllIcon sx={{color:'red'}}/>
                                    <span className='px-2 text-red-600 font-medium'>Annulla</span>
                                </button>

                                
                            </div>

                            
                                
                            <button  onClick={() => ChangeStatus(Number(task.id_task) , window.location.reload())} className='w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"'>
                                Fatto
                            </button>
                            

                            
                        </div>
                    </div>
                </div>


            ))}

           

        </div>
    );
}

export default TabToDo;