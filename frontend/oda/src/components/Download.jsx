
import { useState , useEffect } from "react";

/**
 * 
 *.then(res => res.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nomefile'; // nome con cui salvare
  a.click();
  window.URL.revokeObjectURL(url);
 */

function Download(){

    const token_access = localStorage.getItem('access');
    const [docs , setDocs] = useState([]);


    function DownloadDocs(id_documento , titolo)
    {
        fetch
        (
            `api/download/${id_documento}/`, 

            {
                method : 'GET',
                headers : {
                    'Authorization': `Bearer ${token_access}`,
                }
            }

        )
        .then(res => res.blob())
        .then(blob => 
            {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = titolo;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);

            }

        )
        .catch(err => console.log(err.message));

    }



    useEffect(()=>{

        fetch
        (
            'api/get_files/',

            {
                method : 'GET',
                headers:{
                   'Authorization': `Bearer ${token_access}`,
                }
            }
        )
        .then(res=>
            {
                if(!res.ok){
                    throw new Error('Qualcosa è andato storto')
                }
                return res.json();
            }
        )
        .then(data => setDocs(data))
        .catch(err => console.log(err.message))


    },[])

    return(
       <div className="max-w-4xl mx-auto p-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">I tuoi documenti</h2>
      <ul className="space-y-4">
        
        {Array.isArray(docs) && docs.map(docs=>(

            <li key={docs.id_documento} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <div className="flex items-center space-x-4">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-white font-medium truncate max-w-xs">{docs.titolo}</span>
            </div>
            <button
              onClick={() => DownloadDocs(Number(docs.id_documento) , docs.titolo)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Scarica
            </button>
          </li>


        ))}

         
      
      </ul>
    </div>
    );

}

export default Download;