export interface UserData {
  id: string;
  email: string;
}

export enum NodeEnv {
  dev = 'development',
  prod = 'production',
}

export enum envVariables {
  nodeEnv = 'NODE_ENV',
  databaseUrl = 'DATABASE_URL',
  jwtSecret = 'JWT_SECRET',
}

export enum Routes {
  auth = 'auth',
  users = 'users',
  profile = 'profile',
  login = 'login',
  register = 'register',
}

export enum errorMessageKeys {
  userExists = 'userExists',
  invalidCredentials = 'invalidCredentials',
  internalServerError = 'internalServerError',
  jwtSecretNotDefined = 'jwtSecretIsNotDefined',
}

export enum errorMessages {
  userNotFound = 'User not found',
}

export enum validationErrors {
  emailRequired = 'Email is required field',
  invalidEmail = 'Invalid email',
  nameRequired = 'Name is required field',
  passwordRequired = 'Password is required field',
  passwordTooShort = 'Password must be more than 6 symbols',
}
