import {Link} from "@inertiajs/react";
import {ArrowLeftIcon} from "@heroicons/react/24/solid/index.js";
import GroupAvatar from "@/Components/App/GroupAvatar.jsx";
import UserAvatar from "@/Components/App/UserAvatar.jsx";
import AdminDropdown from "@/Components/App/AdminDropdown.jsx";

export default function ChatHeader(props) {
    const {chat} = props;
    return (
      <>
          {chat && (
              <div className={'p-3 flex justify-between items-center border-b border-slate-700 bg-gray-800'}>
                  <div className="flex items-center gap-3">
                      <Link href={route("home")} className={'inline-block sm:hidden'} >
                          <ArrowLeftIcon className="w-6" />
                      </Link>
                      {chat.is_group ? (
                          <GroupAvatar  />
                      ): (
                          <UserAvatar user={chat} profile={1} />
                      )}
                      <div className="">
                          <h3>{chat.name}</h3>
                          {!!chat.is_group && (
                              <p className={'text-xs text-gray-500'}> * members</p>
                          )}
                      </div>
                  </div>
                  <AdminDropdown chat={chat}/>
              </div>

          )}
      </>
    );
}

