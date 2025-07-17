
import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
function TabToDo(){

    const [task , setTask] = useState([]);
    const [stato , setStato] = useState(null);

    useEffect(()=>{

        fetch(
            'api/tasks/', 
            {

                headers : {
            
                    'Authorization' : `Bearer ${localStorage.getItem('access')}`,
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


    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-4  md:px-10">
            <div className="bg-black h-8 md:h-12 md:col-span-4"></div>
            
            {Array.isArray(task) && task.map(task => (

                
                <div key={task.id}  class="w-full md:w-5/6   bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
                    
                    <div class="flex flex-col text-left pb-10 px-10 py-10">
                        
                        <h5 class="mb-1 text-4xl font-medium text-gray-900 dark:text-white">{task.titolo}</h5>
                        <span class="text-xl text-gray-500 dark:text-gray-400">Da fare : {task.contenuto}</span>
                        <span class="text-lg text-gray-500 dark:text-gray-400">Scadenza : {task.data_formattata}</span>
                        <div class="flex mt-4 md:mt-6">
                            
                        </div>
                    </div>

                    
                </div>

                

                

            ))}

           

        </div>
    );
}

export default TabToDo;