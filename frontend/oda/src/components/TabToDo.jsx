


function TabToDo(){

    return(
        <div className="w-auto">

            <div className="bg-black w-full h-16"></div>


            <div className="px-4 py-10 bg-slate-300 h-auto rounded-md">
                

                <table class=" w-full border-blue-600">
                
                    <thead className="bg-gray-900 ">
                    
                        <tr>
                            
                            <th className="text-white">Task</th>
                            <th className="text-white">Contenuto</th>
                            <th className="text-white">Scadenza</th>
                            <th className="text-white">Stato</th>

                        </tr>
                    
                    </thead>
                
                    <tbody className="bg-slate-950">
                
                        <tr className="text-white text-center">
                            
                            <td>.</td>
                            <td>.</td>
                            <td>.</td>
                            <td>.</td>
                        
                        </tr>                        
                
                    </tbody>

                </table>

            </div>
            


        </div>
    );
}

export default TabToDo;