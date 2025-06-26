import {useDarkMode} from '../../hooks/useDarkMode.ts'
import {FiSun, FiMoon} from 'react-icons/fi'
import {motion} from 'framer-motion'
import Button from "../primitives/Button.tsx";

const icons = [
    {icon: <FiSun/>, label: 'Light mode'},
    {icon: <FiMoon/>, label: 'Dark mode'}
];

export default function DarkModeToggle() {
    const {isDarkMode, toggleDarkMode} = useDarkMode()

    return (
        <div className="flex justify-end">
            <Button
                onClick={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                className="relative flex items-center bg-zinc-200 dark:bg-zinc-600 p-1 rounded-xl w-24 h-12 transition-colors cursor-pointer"
            >
                <motion.div
                    layout
                    transition={{type: 'spring', stiffness: 300, damping: 30}}
                    className="absolute top-1 bottom-1 w-1/2 rounded-xl bg-blue-400 z-0"
                    style={{
                        left: isDarkMode ? '48%' : '3%',
                    }}
                />
                {icons.map(({icon, label}) => (
                    <span
                        key={label}
                        className="relative z-10 w-1/2 flex items-center justify-center text-black dark:text-white"
                        aria-label={label}
                    >
                        {icon}
                    </span>
                ))}
            </Button>
        </div>
    )
}
