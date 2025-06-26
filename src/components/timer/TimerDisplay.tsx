import {FiClock} from 'react-icons/fi';
import type {ITimerDisplayModel} from "../../types/types.ts";
import IconWrapper from "../primitives/IconWrapper.tsx";

export default function TimerDisplay({seconds}: ITimerDisplayModel) {
    return (
        <div className="flex gap-2 items-center font-mono">
            <div className="flex text-lg items-center">
                <IconWrapper icon={<FiClock/>}/>
            </div>
            <div className="flex gap-1 text-lg items-center">
                Time left: <span className="text-md font-semibold">{seconds}s</span>️
            </div>
        </div>
    );
}
