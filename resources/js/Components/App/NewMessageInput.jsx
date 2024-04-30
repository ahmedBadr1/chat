import {useEffect, useRef, useState} from "react";

export default function NewMessageInput ({ value,onChange,onSend}) {

    const input = useRef();

    const onKeyDown = (e) => {
        if (e.key == "Enter" && !e.shiftKey){
            e.preventDefault();
            onSend();
        }
    }

    const onInputChange = (e) => {
        setTimeout(()=>{
            adjustHeight();
        },50);
        onChange(e)
    }
    const adjustHeight = () => {
        setTimeout(()=> {
            input.current.style.height = "auto";
            input.current.style.height = input.current.scrollHeight + 1 + "px";
        },100);
    }

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea ref={input} value={value} rows="1" placeholder={'Type a message'} onKeyDown={(e) => onKeyDown(e)} onChange={(e) => onInputChange(e)}
        className="input input-bordered w-full rounded-r-none resize-none overflow-y-auto max-h-40">
        </textarea>
    )
}
