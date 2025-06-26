import type {
  AlertVariant,
  ConfirmDialogVariant,
  IConfirmDialogVariantStylesModel,
  VoteValue,
} from '../../types/types.ts';

export const CARD_VALUES: VoteValue[] = ['1', '2', '3', '5', '8', '13', '?', '☕'];
export const ROOM_ID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Session storage keys
export const THEME_KEY = 'theme';
export const USER_NAME_KEY = (roomId: string) => `poker:${roomId}:name`;
export const USER_ID_KEY = (roomId: string) => `poker:${roomId}:userId`;
export const USER_VOTE_KEY = (roomId: string) => `poker:${roomId}:vote`;
export const USER_HAS_VOTED_KEY = (roomId: string) => `poker:${roomId}:hasVoted`;
export const USER_IS_NEW_USER_KEY = (roomId: string) => `poker:${roomId}:isNewUser`;

// Page titles and subtitles
export const NOT_FOUND_TITLE = '404 - Page Not Found';
export const NOT_FOUND_SUBTITLE = "Sorry, the page you're looking for doesn't exist.";

// Alert variant styles
export const alertVariantStyles: Record<AlertVariant, string> = {
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  danger: 'bg-red-100 text-red-700 border border-red-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
};

// Confirmation dialog constants
export const CONFIRM_DIALOG = {
  TITLE: (titleText: string) => `${titleText}`,
  MESSAGE: (messageText: string) => `${messageText}`,
  CONFIRM_TEXT: (confirmText: string) => `${confirmText}`,
  CANCEL_TEXT: (cancelText: string) => `${cancelText}`,
};

export const confirmDialogVariantStyles: Record<ConfirmDialogVariant, IConfirmDialogVariantStylesModel> = {
  default: {
    panel: 'bg-white dark:bg-zinc-800',
    confirm: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  danger: {
    panel: 'bg-white dark:bg-zinc-800',
    confirm: 'bg-red-500 hover:bg-red-600 text-white',
  },
  warning: {
    panel: 'bg-yellow-50 dark:bg-yellow-900',
    confirm: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  },
};
