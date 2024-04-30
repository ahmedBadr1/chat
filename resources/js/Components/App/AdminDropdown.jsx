import {Menu, Transition} from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon
} from "@heroicons/react/20/solid/index.js";
import {Fragment} from "react";

export default function AdminDropdown(props) {
    const {chat, online} = props;

    const toggleBlock = () =>{
        axios.post(route('user.block',chat.user_id)).then((res)=> console.log(res)).catch((err) => console.log(err));
    }
    const toggleAdmin = () =>{
        axios.post(route('user.admin',chat.user_id)).then((res)=> console.log(res)).catch((err) => console.log(err));
    }

    return (
        <div className={''}>
            <Menu as={"div"} className={"relative inline-block text-left "}>
                <div className="">
                    <Menu.Button className={"flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40"}>
                        <EllipsisVerticalIcon className={"h-5 w-5"}/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 48 w-40 rounded-md bg-gray-800 shadow-lg z-50">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        onClick={toggleBlock}
                                        className={`${
                                            active ? 'bg-black/30 text-white' : 'text-gray-100'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {!!chat.blocked_at ? (<><LockOpenIcon className={"w-4 h-4 mr-2"}/>Unblock
                                                User</>)
                                            : (<><LockClosedIcon className={"w-4 h-4 mr-2"}/>Block User</>)}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                        onClick={toggleAdmin}
                                        className={`${
                                            active ? 'bg-black/30 text-white' : 'text-gray-100'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {!!chat.is_admin ? (<><UserIcon className={"w-4 h-4 mr-2"}/>Remove From Admin</>)
                                            : (<><ShieldCheckIcon className={"w-4 h-4 mr-2"}/>Make Admin</>)}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

