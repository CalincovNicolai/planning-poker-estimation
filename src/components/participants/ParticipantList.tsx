import type {IParticipantListModel} from '../../types/types.ts'
import Card from "../card/Card.tsx";
import {FiX, FiCheck} from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";
import IconWrapper from "../primitives/IconWrapper.tsx";
import TruncatedNameWithTooltip from '../primitives/TruncatedNameWithTooltip.tsx';

export default function ParticipantList({participants, revealVotes}: IParticipantListModel) {
    return (
        <div className="w-full max-w-2xl space-y-2">
            {participants.map((participant) => (
                <div
                    key={participant.id}
                    className="flex justify-between items-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-18 px-4 py-3 shadow-sm"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-zinc-800 dark:text-white">
                            <TruncatedNameWithTooltip
                                name={participant.name}
                                maxLength={25}
                                className="font-medium text-zinc-800 dark:text-white"
                            />
                        </span>
                        {participant.isCurrentUser && (
                            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-xl">
                                You
                            </span>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {revealVotes ? (
                            <motion.div
                                key={participant.id}
                                initial={{opacity: 0, scale: 0.9, rotateX: -90}}
                                animate={{opacity: 1, scale: 1, rotateX: 0}}
                                exit={{opacity: 0, scale: 0.9, rotateX: 90}}
                                transition={{duration: 0.4, ease: 'easeOut'}}
                            >
                                <Card value={participant.vote ?? '?'} cardWrapperClassName="w-10 h-12" readOnly/>
                            </motion.div>
                        ) : participant.hasVoted ? (
                            <IconWrapper icon={<FiCheck/>} className="text-xl text-green-600"/>
                        ) : (
                            <IconWrapper icon={<FiX/>} className="text-xl text-red-500"/>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
