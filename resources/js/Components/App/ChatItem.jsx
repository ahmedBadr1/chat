import {Link, usePage} from "@inertiajs/react";
import UserAvatar from "@/Components/App/UserAvatar.jsx";
import GroupAvatar from "@/Components/App/GroupAvatar.jsx";
import AdminDropdown from "@/Components/App/AdminDropdown.jsx";

export default function ChatItem(props) {
    const {chat, selected, online} = props;
    const page = usePage();
    const user = page.props.auth.user;
    let classes = " border-transparent";
    if (selected) {
        if (chat.is_group) {
            classes = ' border-blue-500 bg-black/20';
        } else {
            classes = ' border-red-500 bg-black/20';
        }
    }

    return (
        <Link href={chat.is_group ? route('group', chat) : route('chat', chat)} preserveState
              className={'chat-item flex items-center gap-2 p-2 text-gray-300 ' +
                  'transition-all cursor-pointer border-1-4 hover:bg-black/30' + classes + (!chat.is_group && user.is_admin ? ' pr-2' : ' pr-4')}>
            {!chat.is_group ? <UserAvatar user={chat} online={online}/> : <GroupAvatar/>}
            <div className={"flex-1 text-xs max-w-full overflow-hidden " + (chat.blocked_at ? ' opacity-50' : '')}>
                <div className="flex gap-1 justify-between items-center">
                    <h3 className="text-sm font-semibold overflow-hidden text-nowrap text-ellipsis">         {chat.name}</h3>
                    {chat.last_message_date && (
                        <span className={'text-nowrap'}>{chat.last_message_date}</span>
                    )}
                </div>
                {chat.last_message && (
                    <p className={'text-xs overflow-hidden text-nowrap text-ellipsis'}>{chat.last_message.content}</p>
                )}
            </div>
            {user.is_admin && !chat.is_group && (
                <AdminDropdown chat={chat}/>
            )}
        </Link>
    );
}

