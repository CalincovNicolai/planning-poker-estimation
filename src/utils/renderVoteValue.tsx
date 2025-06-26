import {FiCoffee} from 'react-icons/fi';
import {FaQuestion} from "react-icons/fa6";
import type {VoteValue} from '../types/types';
import type {JSX} from "react";

export function renderVoteValue(value: VoteValue): string | JSX.Element {
    if (value === '☕') return <FiCoffee/>;
    if (value === '?') return <FaQuestion/>;

    return value;
}
