
import React, { useEffect, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';




function TabCreate(){

    const [titolo , setTitolo] = useState('');
    const [contenuto , setContenuto] = useState('');
    const [scadenza , setDataFormattata] = useState('');

   

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
                    
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                } ,

                body : JSON.stringify({titolo , contenuto , scadenza:new Date(scadenza).toISOString().split('T')[0]})
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

        <div className=" w-auto">
            
            <div className="text-6xl font-thin text-white text-center py-10  h-auto"><h1>ADD TASK</h1></div>
            <div className="py-20"></div>


            <div className="justify-center items-center  ">
                
                <div className="flex gap-x-4 justify-center items-center">
                        
                    <form onSubmit={CreateTask} className="flex flex-col gap-x-4 " action="">
                       
                        <div>
                            <div>
                                <label htmlFor="" className="text-white">Titolo</label>
                            </div>
                                
                            <input value={titolo} onChange={e => setTitolo(e.target.value)} type="text" className="border p-2 rounded w-56 md:w-96" />
                        </div>

                        <div>
                            <div  className='py-2'>
                                <label htmlFor="" className="text-white">Contenuto</label>
                            </div>

                            <input value={contenuto} onChange={e => setContenuto(e.target.value)} type="text" className="border p-2 rounded w-56 md:w-96" />
                        </div>

                        <div>
                            <div  className='py-2'>
                                <label htmlFor="" className="text-white">Scadenza</label>
                            </div>

                            <input value={scadenza} onChange={e => setDataFormattata(e.target.value)} type="date" className="border p-2 rounded h-11 w-56 md:w-96 text-md" />
                        </div>


                        <div>
                            <div className='py-3'></div>
                            <button type="submit" className="text-white w-56 md:w-96 h-11 bg-blue-800 p-2 hover:bg-blue-600 rounded-md  font-thin"><FileUploadIcon sx={{fontSize:30}}/></button>
                        </div>
                    
                    </form>

                  
                </div>
          

            </div>

          

        </div>



    );
}

export default TabCreate;