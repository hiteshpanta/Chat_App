import { useEffect, useRef, useState } from "react";
import { connectWs } from "./ws";



function App() {

  const socket = useRef<any>(null);

  const [ userName, setUserName ] = useState<string | null>(null);
  const [ showNamePopup, setShowNamePopup ] = useState<boolean>(true);
  const [ inputName, setInputName] = useState<string>('');


  const [ messages, setMessages ] = useState<string[]>([]);
  const [ text, setText ] = useState<string>('');


  useEffect(() => {
    socket.current = connectWs();
    
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
      <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-thin">
        // Enter your name to start chatting
        {}
      </div>
    </>
  )
}

export default App
