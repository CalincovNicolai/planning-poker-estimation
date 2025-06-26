import type {ILoaderModel} from "../../types/types";
import {FiLoader} from "react-icons/fi";
import IconWrapper from "./IconWrapper.tsx";

export default function Loader({label = 'Loading...'}: ILoaderModel) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 dark:text-zinc-400">
            <IconWrapper icon={<FiLoader/>} className="animate-spin h-8 w-8 mb-2 text-blue-500"/>
            <p className="text-sm">{label}</p>
        </div>
    );
}
