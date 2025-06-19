import { Button } from "@/components/atoms/Button"
import { Icon } from "@/components/Icon"
import React from "react"

interface Props {
    label?: string;
    className?: string;
}

const InputEmailSubscribe: React.FC<Props> = ({className, label}) => {
    return <div className={`flex place-content-center max-w-[600px] ${className}`} >
        <div className="border-l border-t border-b border-gray-300 p-[10px] flex bg-white items-center rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none">
            <Icon name="IconEnvelope" className="text-gray-500" />
        </div>
        <input className="flex-1 border-t border-b border-gray-300 p-[10px] text-gray-500 focus-visible:outline-none" type="text" placeholder="Your Email" />
        <Button shape="square" className="rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none">{label}</Button>
    </div>
}

export default InputEmailSubscribe