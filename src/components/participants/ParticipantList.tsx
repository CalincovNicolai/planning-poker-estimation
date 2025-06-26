import type {IParticipantListModel} from '../../types/types.ts'
import {FiInfo} from "react-icons/fi";
import {motion} from "framer-motion";
import InlineAlert from "../primitives/InlineAlert.tsx";
import {useMemo} from "react";
import ParticipantRow from "./ParticipantRow.tsx";

const listVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.1}
    }
};

const itemVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0}
};

export default function ParticipantList({participants, revealVotes, timer, allVoted}: IParticipantListModel) {
    const hasStarted = participants.length > 0;
    const hasTimer = timer !== null && timer > 0;
    const notEveryoneVoted = hasStarted && !allVoted;

    const remainingCount = useMemo(
        () => participants.filter(p => !p.hasVoted).length,
        [participants]
    );
    const showWaitingHint = useMemo(
        () => notEveryoneVoted && hasTimer,
        [notEveryoneVoted, hasTimer]
    );

    return (
        <motion.div
            className="w-full max-w-2xl space-y-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            {participants.map((participant) => (
                <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    revealVotes={revealVotes}
                    itemVariants={itemVariants}
                />
            ))}
            <InlineAlert show={showWaitingHint} icon={<FiInfo/>} variant="info">
                Waiting for {remainingCount} participant{remainingCount > 1 ? 's' : ''} to vote...
            </InlineAlert>
        </motion.div>
    );
}
