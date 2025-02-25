import { Locales } from './i18n/routing';
import { QuestionTypes } from './types/question';

export const COLORS = {
    dark: {
        backgroundColor: '#121212',
        textColor: '#ffffff',
        borderColor: '#444',
    },
    light: {
        backgroundColor: '#ffffff',
        textColor: '#333',
        borderColor: '#ddd',
    },
    greyLight: '#f0f0f0',
    greyDark: '#e0e0e0',
    whiteTransparent: 'rgba(255, 255, 255, 0.1)',
};

export const MAX_QUESTIONS_OF_TYPE = 4;
export const HASHTAG = '#';
export const DASH = '-';

export const LOCALE_CODES = {
    [Locales.en]: 'en-US',
    [Locales.ru]: 'ru-RU',
};

export const INDEX_NOT_FOUND_VALUE = -1;
export const TAB_PARAMS_VALUE = 'tab';

export const DEFAULT_TEMPLATE_FORM_VALUES = {
    title: '',
    description: '',
    topicId: '',
    tags: [],
    questions: [],
    isPublic: false,
    users: [],
};

export const DEFAULT_TEMPLATE_FORM_QUESTIONS_VALUES = {
    title: '',
    description: '',
    type: QuestionTypes.singleLineString,
    required: false,
    showInResults: true,
    options: [],
    users: [],
};
