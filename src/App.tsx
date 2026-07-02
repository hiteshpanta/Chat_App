import { useEffect, useRef, useState } from "react";
import { connectWs } from "./ws";



function App() {

  const socket = useRef<any>(null);

  const [ userName, setUserName ] = useState<string | null>(null);
  const [ showNamePopup, setShowNamePopup ] = useState<boolean>(true);
  const [ inputName, setInputName] = useState<string>('');


  const [ messages, setMessages ] = useState<string[]>([]);
  // const [ text, setText ] = useState<string>('');


  useEffect(() => {
    socket.current = connectWs();

    socket.current.on("connect", () => {

      socket.current.emit('joinRoom', userName);


    })
  },[])


  function formatTime(ts: number) {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    
    return `${hh}:${mm}`;
  }

  function handleNameSubmit(e: any){

    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) return;

  }
 

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-inter">
        
        {showNamePopup && (
          <div className="fixed inset-0 flex items-center justify-center z-40">
            <div className="bg-white rounded-xl shadow-lg max-w-md p-6">
              <h1 className="text-xl font-semibold text-black">Enter Your name</h1>
              <p className="text-sm text-gray-500 mt-1">Enter Your nane to start chatting. This will be used to identify you in the chat.</p>

              <form action="" className="mt-4" onSubmit={handleNameSubmit}>
                <input
                  autoFocus
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full border-gray-200 rounded-md px-3 py-2 outline-green-500 placeholder-gray-400"
                  placeholder="Your name(e.g. Ram)"

                />


                <button
                  type="submit"
                  className="block ml-auto mt-3 px-4 py-1.5 rounded-full bg-green-500 text-white font-medium cursor-pointer">
                  Continue
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default App
