import BackToLobbyButton from "../components/back-button/BackToLobbyButton.tsx";
import {NOT_FOUND_TITLE, NOT_FOUND_SUBTITLE} from "../components/constants/constants.ts";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-4xl font-bold mb-4">{NOT_FOUND_TITLE}</h1>
            <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-300">
                {NOT_FOUND_SUBTITLE}
            </p>
            <BackToLobbyButton
                label={'Go Back to Lobby'}
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer"
            />
        </div>
    );
}
