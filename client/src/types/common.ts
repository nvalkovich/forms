export enum AuthType {
    login = 'login',
    register = 'register',
}

export enum AdminActionsTypes {
    block = 'block',
    unblock = 'unblock',
    makeAdmin = 'makeAdmin',
    revokeAdminRights = 'revokeAdminRights',
    delete = 'delete',
}

export enum TextFieldTypes {
    text = 'text',
    number = 'number',
    password = 'password',
    email = 'email',
}

export enum QuestionRendererTypes {
    preview = 'preview',
    input = 'input',
}

export enum Topics {
    quiz = 'quiz',
    education = 'education',
    other = 'other',
}

export enum SelectableItemsChipPlacement {
    top = 'top',
    bottom = 'bottom',
}
