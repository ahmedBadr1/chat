import {UsersIcon} from "@heroicons/react/20/solid/index.js";

export default function GroupAvatar (props) {
    const {group,online } = props ;
    return (
        <div className={'avatar placeholder'}>
        <div className="bg-gray-400 text-gray-800 rounded-full w-12">
            <span className={'text-xl'}>
                <UsersIcon className={'w-8'} />
            </span>
        </div>
        </div>
    );
}

