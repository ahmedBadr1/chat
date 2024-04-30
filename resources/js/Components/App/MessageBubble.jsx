import {Link, usePage} from "@inertiajs/react";
import {ArrowLeftIcon} from "@heroicons/react/24/solid/index.js";
import GroupAvatar from "@/Components/App/GroupAvatar.jsx";
import UserAvatar from "@/Components/App/UserAvatar.jsx";
import  ReactMarkdown from 'react-markdown';
import {formatDate} from "@/helpers.jsx";
import {CheckCircleIcon} from "@heroicons/react/16/solid/index.js";

export default function MessageBubble({message}) {
    const user = usePage().props.auth.user;
    const isMine = (id) => (id === user.id);

    return (
        <>
            <div className={`chat ${!isMine(message.sender_id) ? "chat-start" : "chat-end"}  max-w-2xl`}>
                {/*<div className="chat-header">*/}
                {/*    {message.sender_id}*/}
                {/*    <time className="text-xs opacity-50 ">{formatDate(message.updated_at)}</time>*/}
                {/*</div>*/}
                <div className={`chat-bubble  ${isMine(message.sender_id) ? '' : 'chat-bubble-accent'}`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <div className="chat-footer opacity-50">
                    <time className="text-xs opacity-50 ">{formatDate(message.updated_at)}</time>
                    {/*<CheckCircleIcon className={'w-4'} />*/}
                    {/*{message.seen_at}*/}
                </div>
            </div>
        </>
    );
}
