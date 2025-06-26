import type {IIconWrapperModel} from "../../types/types.ts";
import clsx from "clsx";

export default function IconWrapper({icon, className}: IIconWrapperModel) {
    return (
        <span className={clsx('inline-flex items-center justify-center', className)}>
            {icon}
        </span>
    );
}
