import {FiCopy, FiCheck} from 'react-icons/fi'
import {useState} from 'react'
import type {ICopyToClipboardButtonModel} from "../../types/types.ts";
import Button from "./Button.tsx";
import IconWrapper from "./IconWrapper.tsx";

export default function CopyToClipboardButton({value, className}: ICopyToClipboardButtonModel) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            console.error('Copy failed:', err)
        }
    }

    return (
        <Button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 w-28 h-10 p-3 bg-zinc-200 font-medium text-sm dark:bg-zinc-700 rounded-xl text-black dark:text-white hover:bg-blue-400 hover:text-white transition-colors cursor-pointer ${className}`}
        >
            <IconWrapper icon={copied ? <FiCheck/> : <FiCopy/>}/>
            {copied ? 'Copied' : 'Copy ID'}
        </Button>
    )
}
