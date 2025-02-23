export interface UserData {
  id: string;
  email: string;
}

export enum NodeEnv {
  dev = 'development',
  prod = 'production',
}

export enum EnvVariables {
  nodeEnv = 'NODE_ENV',
  databaseUrl = 'DATABASE_URL',
  jwtSecret = 'JWT_SECRET',
}

export enum Routes {
  auth = 'auth',
  users = 'users',
  tags = 'tags',
  questions = 'questions',
  templates = 'templates',
  topics = 'topics',
  profile = 'profile',
  login = 'login',
  register = 'register',
}

export enum ErrorMessageKeys {
  userExists = 'userExists',
  userNotFound = 'userNotFound',
  usersNotFound = 'usersNotFound',
  accessDenied = 'Access denied',
  templateNotFound = 'templateNotFound',
  invalidCredentials = 'invalidCredentials',
  internalServerError = 'internalServerError',
  jwtSecretNotDefined = 'jwtSecretIsNotDefined',
  tagsNotFound = 'tagsNotFound',
  topicNotFound = 'topicNotFound',
}

export enum validationErrors {
  emailRequired = 'Email is required field',
  invalidEmail = 'Invalid email',
  nameRequired = 'Name is required field',
  passwordRequired = 'Password is required field',
  passwordTooShort = 'Password must be more than 6 symbols',
}
