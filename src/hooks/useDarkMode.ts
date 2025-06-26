import {useEffect, useState} from 'react'
import {type IThemeMode, ThemeMode} from '../types/types'
import {THEME_KEY} from "../components/constants/constants.ts";

export function useDarkMode() {
    const [mode, setMode] = useState<IThemeMode>(ThemeMode.Light)

    useEffect(() => {
        const stored = sessionStorage.getItem(THEME_KEY) as IThemeMode | null
        const preferred = stored || ThemeMode.Light

        setDocumentClass(preferred)
        setMode(preferred)
    }, [])

    const setDocumentClass = (newMode: IThemeMode) => {
        if (newMode === ThemeMode.Dark) {
            document.body.classList.add(ThemeMode.Dark)
        } else {
            document.body.classList.remove(ThemeMode.Dark)
        }

        sessionStorage.setItem(THEME_KEY, newMode)
    }

    const toggleDarkMode = (newMode: IThemeMode) => {
        setDocumentClass(newMode)
        setMode(newMode)
    }

    return {
        mode,
        isDarkMode: mode === ThemeMode.Dark,
        toggleDarkMode,
    }
}
