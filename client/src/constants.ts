import { Locales } from './i18n/routing';
import { QuestionTypes } from './types/question';
import { TemplateTabsTypes } from './types/template';

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

export const DEFAULT_TEMPLATE_TAB = TemplateTabsTypes.template;
export const DEFAULT_TEMPLATE_TAB_INDEX = 0;

export const FETCH_ERROR = 'Failed to fetch';

export const JIRA_BASE_URL = 'https://forms-app.atlassian.net';

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
    whiteSmoke: '#f5f5f5',
    black: '#000000',
};

export const TABLE_STYLES = {
    cell: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        outline: 'none !important',
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: COLORS.whiteSmoke,
        },
    },
    header: {
        backgroundColor: COLORS.whiteSmoke,
    },
};
