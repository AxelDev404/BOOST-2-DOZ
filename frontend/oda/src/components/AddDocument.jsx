
import { useState , useEffect } from "react";


function AddDocument(){

    const [titolo , setTitolo] = useState('');
    const [documento , setDocumento] = useState(null);


    const token_access = localStorage.getItem('access');


    const UploadDocument =(e)=>{

        e.preventDefault()  


        const formData = new FormData();
        formData.append('titolo' , titolo);
        formData.append('documento' , documento);
    

        fetch
        (
            'api/upload_file/',

            {
                method : 'POST',

                headers : {
                    //nel upload dei file non server il content-type application/json
                    'Authorization': `Bearer ${token_access}`,
                },

                body : formData
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
        .then(data => 
            {
                setTitolo('');
                setDocumento(null);
                formData.append('documento' , null);
            }
        )
        .catch(err => console.log(err.message))


    }




    return(
      <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-md mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700 p-8">
               
                <form onSubmit={UploadDocument} className="space-y-6">
                    {/* Titolo Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Nome
                        </label>
                        <div className="relative">
                            <input
                                value={titolo}
                                onChange={e => setTitolo(e.target.value)}
                                type="text"
                                className="block w-full px-4 py-3 bg-white border border-gray-600 text-gray-600 rounded-lg   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="nome del documento"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wider">
                            Documento
                        </label>
                        <div className="relative">
                            <input
                                
                                onChange={e => setDocumento(e.target.files[0])}
                                type="file"
                                className="block w-full px-4 py-3 bg-white border border-gray-600 rounded-lg   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                               
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div className="pt-4">

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                            
                            <span>Add Document</span>
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDocument;