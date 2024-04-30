import ChatLayout from "@/Layouts/ChatLayout.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {useEffect, useRef, useState} from "react";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid/index.js";
import MessageBubble from "@/Components/App/MessageBubble.jsx";
import ChatHeader from "@/Components/App/ChatHeader.jsx";
import MessageInput from "@/Components/App/MessageInput.jsx";

function Home({auth, messages = null ,selectedChat = null}) {
    const [localMessages, setLocalMessages] = useState([]);

    const messageCtrRef = useRef(null);

    useEffect(() => {
        setTimeout(()=>{
            messageCtrRef.current.scrollTop = messageCtrRef.current.scrollHeight ;
        },10);
    }, [selectedChat]);
    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);


    return (
        <>
            {!messages ? (
                <div className={'flex flex-col gap-8 justify-center items-center text-center h-full opacity-35'}>
                    <div className="text-2xl md:text-4xl p-16 text-slate-200">
                        Start Chating Now ...
                    </div>
                    <ChatBubbleLeftRightIcon className={'w-32 h-32 inline-block'}/>
                </div>
            ) : (
                <>
                    <ChatHeader chat={selectedChat}  />
                    <div ref={messageCtrRef} className={'flex-1 p-5 overflow-y-auto max-h-[50%]  '}>
                        {localMessages.length === 0 ? (
                            <div className={'flex justify-center items-center '}>
                                <div className="text-lg text-slate-200">
                                    No Messages Found
                                </div>
                            </div>
                        ) : (
                            <div className={'flex-1 flex flex-col '}>
                                {localMessages.map((message) => (
                                        <MessageBubble key={message.id} char={selectedChat} message={message} />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput chat={selectedChat} />

                </>
            )}

        </>

    );
}

Home.layout = page => (
    <AuthenticatedLayout
        user={page.props.auth.user}
    >
        <ChatLayout children={page}>
        </ChatLayout>
    </AuthenticatedLayout>)


export default Home;
