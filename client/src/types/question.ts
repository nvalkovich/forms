export enum QuestionTypes {
    singleLineString = 'singleLineString',
    multiLineString = 'multiLineString',
    positiveInteger = 'positiveInteger',
    checkbox = 'checkbox',
}

export type QuestionFieldValue = string | number | string[];

export interface QuestionField {
    value: QuestionFieldValue;
}

export interface Question {
    title: string;
    type: QuestionTypes;
    description?: string;
    required: boolean;
    showInResults: boolean;
    options: { value: string }[];
    order?: number;
}

export enum TemplateQuestionFields {
    title = 'title',
    description = 'description',
    type = 'type',
    options = 'options',
    required = 'required',
    showInResults = 'showInResults',
}
