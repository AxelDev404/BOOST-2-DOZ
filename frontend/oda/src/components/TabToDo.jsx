
import React, { useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
function TabToDo(){

    const [task , setTask] = useState([]);
    const [stato , setStato] = useState(null);

    useEffect(()=>{

        fetch('api/tasks/')
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
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="bg-black h-8 md:h-12 md:col-span-4"></div>

            {Array.isArray(task) && task.map(task => (
                <div key={task.id} className="px-1.5 md:px-2 w-full md:h-20 h-56 bg-slate-300 rounded-sm">
                    <h1 className="text-lg truncate py-2 px-10">Titolo: {task.titolo}</h1>
                </div>
            ))}
        </div>
    );
}

export default TabToDo;