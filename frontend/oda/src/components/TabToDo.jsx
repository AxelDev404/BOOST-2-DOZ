
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
        
        <div className="w-auto">

            <div className="bg-black h-16"></div>


            <div className="px-4 py-10 bg-slate-300 h-auto rounded-md">
                

                
                <table className=" w-full  border-blue-600">
                
                    <thead className="bg-gray-900  ">
                    
                        <tr>
                            
                            <th className="text-white">Task</th>
                            <th className="text-white">Contenuto</th>
                            <th className="text-white">Scadenza</th>
                            <th className="text-white">Stato</th>

                        </tr>
                    
                    </thead>


                    {Array.isArray(task) && task.map(task=>(

                        <tbody className="bg-slate-950">
                                        
                            <tr key={task.id_task}  className="text-white text-center">
                                                    
                                <td>{task.titolo}</td>
                                <td>{task.contenuto}</td>
                                <td>{task.scadenza}</td>
                                <td>{task.stato ? <CircleIcon sx={{color:'green'}}/> : <CircleIcon sx={{color:'red'}}/> }</td>
                                                
                            </tr>                        
                                        
                        </tbody>

                    ))}
                    


                    

                </table>

            </div>
            


        </div>
    );
}

export default TabToDo;