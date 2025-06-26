import React from 'react'
import type {ButtonProps} from "../../types/types.ts";

const Button: React.FC<ButtonProps> = ({children, className = '', ...props}) => (
    <button
        className={className}
        {...props}
    >
        {children}
    </button>
)

export default Button
