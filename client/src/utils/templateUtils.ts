import {
    TemplateFormData,
    TemplateFormFields,
    TemplateTableFields,
    Template,
    TemplateTableRow,
    TemplateAvailabilityTypes,
} from '@/types/template';
import { MAX_QUESTIONS_OF_TYPE } from '@/constants';
import { Topics } from '@/types/topic';
import { QuestionTypes } from '@/types/question';
import {
    DEFAULT_TEMPLATE_FORM_QUESTIONS_VALUES,
    HASHTAG,
    DASH,
} from '@/constants';
import { useTranslationsHook } from '@/i18n/routing';
import { Routes } from '@/hooks/useNavigation';
import { TAB_PARAMS_VALUE } from '@/constants';
import { TemplateAccessTypes } from '@/types/template';
import { TemplateConfigTab } from '@/components/pages/Template/TemplateTabs/TemplateTabs';

export const getDefaultQuestionType = (
    questions: TemplateFormData[TemplateFormFields.questions] = [],
): QuestionTypes | null => {
    if (!Array.isArray(questions)) {
        return null;
    }

    const typeCounts = Object.values(QuestionTypes).reduce(
        (acc, type) => {
            acc[type] = questions.filter((q) => q.type === type).length;
            return acc;
        },
        {} as Record<QuestionTypes, number>,
    );

    return (
        Object.values(QuestionTypes).find(
            (type) => typeCounts[type] < MAX_QUESTIONS_OF_TYPE,
        ) || null
    );
};

export const getDefaultQuestionValues = (defaultType: QuestionTypes) => {
    return {
        ...DEFAULT_TEMPLATE_FORM_QUESTIONS_VALUES,
        type: defaultType,
        options: defaultType === QuestionTypes.checkbox ? [{ value: '' }] : [],
    };
};

export const getTopicValueForView = (value: string, t: useTranslationsHook) =>
    Object.values(Topics).includes(value as Topics) ? t(value) : value;

export const getStatusLabel = (
    isAuthor: boolean,
    isPublic: boolean,
    t: useTranslationsHook,
) => {
    const statusLabelsTranslations = {
        public: t(TemplateAvailabilityTypes.public),
        private: t(TemplateAvailabilityTypes.accessRestricted),
        accessGranted: t('accessGranted'),
    };

    if (isAuthor)
        return isPublic
            ? statusLabelsTranslations.public
            : statusLabelsTranslations.private;
    return isPublic
        ? statusLabelsTranslations.public
        : statusLabelsTranslations.accessGranted;
};

export const getTemplateTableColumns = (t: useTranslationsHook) => {
    return [
        {
            field: TemplateTableFields.rowNumber,
            headerName: HASHTAG,
            width: 10,
        },
        {
            field: TemplateTableFields.title,
            headerName: t(TemplateTableFields.title),
            minWidth: 120,
            flex: 1,
        },
        {
            field: TemplateTableFields.description,
            headerName: t(TemplateTableFields.description),
            minWidth: 180,
            flex: 1,
        },
        {
            field: TemplateTableFields.topic,
            headerName: t(TemplateTableFields.topic),
            width: 100,
        },
        {
            field: TemplateTableFields.tags,
            headerName: t(TemplateTableFields.tags),
            width: 150,
        },
        {
            field: TemplateTableFields.createdAt,
            headerName: t(TemplateTableFields.createdAt),
            width: 110,
        },
        {
            field: TemplateTableFields.status,
            headerName: t(TemplateTableFields.status),
            width: 150,
        },
    ];
};

export const transformTemplateTableRows = (
    templates: Template[],
    t: useTranslationsHook,
): TemplateTableRow[] => {
    if (!templates) return [];

    return templates.map((template: Template, index: number) => {
        const { id, title, description, topic, tags, createdAt, isPublic } =
            template;

        return {
            rowNumber: index + 1,
            id,
            title,
            description: description || DASH,
            topic: getTopicValueForView(topic.title, t),
            tags: tags.map((tag) => tag.name).join(', '),
            createdAt: new Date(createdAt).toLocaleDateString(),
            status: isPublic
                ? t(TemplateAvailabilityTypes.public)
                : t(TemplateAvailabilityTypes.accessRestricted),
            filledForms: 0,
        };
    });
};

export const getTemplatePathWithTab = (templateId: string, newTab: string) =>
    `${Routes.templates}/${templateId}?${TAB_PARAMS_VALUE}=${newTab}`;

export const getTemplateAvailableTabs = (isAuthor: boolean, isAdmin: boolean, tabsConfig: TemplateConfigTab[]) => {
    return tabsConfig.filter((tab) => {
    if (tab.availableFor === TemplateAccessTypes.all) return true;
    if (tab.availableFor === TemplateAccessTypes.authorOrAdmin && (isAuthor || isAdmin)) {
        return true;
    }
    return false;
});
}

export const findTemplateTabIndex = (tabs: TemplateConfigTab[], key: string) => {
    return tabs.findIndex((tab) => tab.key === key);
};

