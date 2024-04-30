import {PaperClipIcon,PhotoIcon,FaceSmileIcon,HandThumbUpIcon,PaperAirplaneIcon} from "@heroicons/react/24/solid/index.js";
import {useState} from "react";
import NewMessageInput from "@/Components/App/NewMessageInput.jsx";

export default function MessageInput ({ chat = null}) {
    const [message , setMessage] = useState('');
    const [error , setError] = useState('');
    const [sending , setSending] = useState(false);

    const Send = () => {
        if (message.trim() === ""){
            setError('Please provide a message');
            setTimeout(()=>{
                setError("");
            },3000);
            return ;
        }
        const formData = new FormData();
        formData.append('content' , message);
        if (chat.is_group){
            formData.append('group_id',chat.id);
        }else if (!chat.is_group){
            formData.append('chat_id',chat.id)
        }
        setSending(true);

        axios.post(route('messages.store'),formData,{
            onUploadProgress : (progressEvent)=>{
                const progress = Math.round(progressEvent.Loaded / progressEvent.total  * 100)
                console.log(progress)
            }
        }).then((res)=> {
            setMessage('')

        }).catch((err)=> {
            setError(err.data.message);
        }).finally(()=>{
            setSending(false) ;
        })


    }

    return (
       <div className={'flex flex-wrap items-start border-t border-slate-700 py-3  '}>
           <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
               <button className={'p-1 text-gray-400 hover:text-gray-300 relative'}>
                   <PaperClipIcon className={'w-6'}/>
                   <input type="file" multiple
                          className="absolute left-0 top-0 bottom-0 z-20 opacity-0 cursor-pointer"/>
               </button>
               <button className={'p-1 text-gray-400 hover:text-gray-300 relative'}>
                   <PhotoIcon className={'w-6'}/>
                   <input type="file" multiple accept="image/*"
                          className="absolute left-0 top-0 bottom-0  opacity-0 cursor-pointer"/>
               </button>
           </div>
           <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
               <div className="flex">
                   <NewMessageInput value={message} onChange={(e)=> setMessage(e.target.value)} onSend={Send} />
                   <button onClick={Send} className={'btn btn-info rounded-1-none'} disabled={sending}>
                       {sending && (
                           <span className="loading loading-spinner loading-xs"></span>
                       )}
                       <PaperAirplaneIcon className={"w-6"} />
                       <span className="hidden sm:inline">Send</span>
                   </button>
               </div>
               {error && (
                   <p className="text-xs text-red-400" >{error}</p>
               )}
           </div>
           <div className="order-3 xs:order-3 p-2 flex ">
               <button className="p-1 text-gray-400 hover:text-gray-300 ">
                   <FaceSmileIcon className="w-6 h-6"/>
               </button>
               <button className="p-1 text-gray-400 hover:text-gray-300 ">
                   <HandThumbUpIcon className="w-6 h-6"/>
               </button>
           </div>
       </div>
    )
}
