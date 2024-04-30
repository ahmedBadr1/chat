export default function UserAvatar (props) {
    const {user,online ,profile } = props ;
    let onlineClass  = online === true ? "online" : online ==false ? 'offline' : '';
    const size = profile ? ' w-40' : ' w-8' ;
    return (
        <>
            {!!user.avatar ? (
                <div className={`chat-image avatar ${onlineClass}`}>
                    <div className="w-12 rounded-full">
                        <img src={user.avatar}/>
                    </div>
                </div>
            ) : (
                <div className={`avatar placeholder ${onlineClass} `}>
                    <div className={"bg-neutral text-neutral-content rounded-full w-12"}>
                        <span className="text-xl">{user.name?.substring(0,1)}</span>
                    </div>
                </div>
            )}
        </>
    );
}

