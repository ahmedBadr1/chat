import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {useEffect, useState} from "react";
import {PencilSquareIcon} from "@heroicons/react/20/solid/index.js";
import TextInput from "@/Components/TextInput.jsx";
import ChatItem from "@/Components/App/ChatItem.jsx";

const ChatLayout = ({children}) => {
    const page = usePage();
    const chats = page.props.chats;
    const selectedChat = page.props.selectedChat;
    const [localChats, setLocalChats] = useState([]);
    const [sortedChats, setSortedChats] = useState([]);
    const [online, setOnline] = useState({});
    const isOnline = (userId) => online[userId] ? true : false;

    useEffect(() => {
        setLocalChats(chats);
    }, [chats]);

    useEffect(() => {
        setSortedChats(localChats.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }
                // if (a.last_message_date && b.last_message_date){
                //     return b.last_message_date.localCompare(a.)
                // }
            }
        ))
    }, [localChats]);

    useEffect(() => {
        Echo.join('online')
            .here((users) => {
                const onlineUsers = Object.fromEntries(users.map((user) => [user.id, user]))
                setOnline((prevOnline) => ({...prevOnline, ...onlineUsers}))
            })
            .joining((user) =>
                setOnline((prevOnline) => {
                    const updatedUsers = {...prevOnline};
                    updatedUsers[user.id] = user
                    return updatedUsers;
                }))
            .leaving((user) => setOnline((prevOnline) => {
                const updatedUsers = {...prevOnline};
                delete updatedUsers[user.id]
                return updatedUsers;
            }))
            .error((error) => console.log('error', error))
    }, []);

    const onSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setLocalChats(chats.filter((chat) => (chat.name?.toLowerCase().includes(query))))
    }

    return (
        <div className={'flex-1 w-full flex overflow-hidden  dark:text-white '}>
            <div className={`transition-all w-full sm:w-[220px] md:w-[300px]  lg:w-[400px] h-screen bg-slate-800 flex flex-col
            ${selectedChat ? '-ml-[100%] sm:ml-0' : ''}`}>
                <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
                    All Chats
                    <div className="tooltip tooltip-left" data-tip={"Create New Group"}>
                        <button className={'text-gray-400 hover:bg-gray-200'}>
                            <PencilSquareIcon className={'w-4 h-4 inline-block ml-2'}/>
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <TextInput onKeyUp={onSearch} placeholder={'Filter users and groups'} className={'w-full'}/>
                </div>
                <div className="flex-1 overflow-y-auto " >
                    {!!sortedChats.length ? sortedChats.map((chat) => (
                        <ChatItem key={`${chat.is_group ? 'g_' : 'u_'}${chat.id}`} chat={chat}
                                  selected={selectedChat?.id === chat.id} online={!chat.is_group && isOnline(chat.id)}/>
                    )) : (
                        <p className={"text-center"}>No Chats Found</p>
                    )}
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden w-full relative">
                {children}
            </div>

        </div>
    );
}
export default ChatLayout;
