import React, {type ReactElement, type ReactNode} from "react";
import type {Variants} from "framer-motion";

export const ThemeMode = {
    Light: 'light',
    Dark: 'dark'
} as const;

export type IThemeMode = typeof ThemeMode[keyof typeof ThemeMode];
export type VoteValue = '1' | '2' | '3' | '5' | '8' | '13' | '?' | '☕'
export type AlertVariant = 'info' | 'warning' | 'danger' | 'success';
export type ConfirmDialogVariant = 'default' | 'danger' | 'warning'
export type IInputModel = React.InputHTMLAttributes<HTMLInputElement>
export type ButtonProps = {
    children: ReactNode
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export interface IParticipantListModel {
    participants: IParticipantModel[]
    revealVotes: boolean
    timer: number
    allVoted: boolean
}

export interface IParticipantRowModel {
    participant: IParticipantModel
    revealVotes: boolean
    itemVariants: Variants
}

export interface IParticipantModel {
    id: string
    name: string
    vote: VoteValue | null
    hasVoted: boolean
    isCurrentUser?: boolean
}

export interface ICardModel {
    value: VoteValue
    onClick?: () => void
    disabled?: boolean
    readOnly?: boolean
    cardWrapperClassName?: string
}

export interface IPageLayoutProps {
    children: React.ReactNode;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
}

export interface ILayoutCardModel {
    title?: ReactNode | string
    children: ReactNode
    className?: string
}

export interface ICopyToClipboardButtonModel {
    value: string
    className?: string
}

export interface IBackToLobbyButtonModel {
    label: string
    className?: string
}

export interface ILoaderModel {
    label?: string
}

export interface IFadeRouteWrapperModel {
    children: ReactNode
}

export interface ITimerDisplayModel {
    seconds: number
}

export interface IInlineAlertModel {
    icon?: ReactNode;
    children: ReactNode;
    variant?: AlertVariant;
    show?: boolean;
    className?: string;
}

export interface IIconWrapperModel {
    icon: ReactElement;
    className?: string;
}

export interface ISaveSessionModel {
    name?: string;
    userId?: string;
    roomId: string;
    vote?: VoteValue;
    hasVoted?: boolean;
    isNewUser?: boolean;
}

export interface ITruncatedTextWithTooltipModel {
    name: string;
    maxLength?: number;
    className?: string;
}

export interface IErrorMessageModel {
    name?: string;
    roomId?: string;
}

export interface IConfirmDialogModel {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export interface IConfirmDialogVariantStylesModel {
    panel: string;
    confirm: string
}
