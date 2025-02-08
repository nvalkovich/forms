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

export enum errorMessages {
  userExists = 'User with this email already exists',
  invalidCredentials = 'Invalid credentials',
  internalServerError = 'Internal server error',
  jwtSecretNotDefined = 'JWT_SECRET is not defined',
}

export enum validationErrors {
  emailRequired = 'Email is required field',
  invalidEmail = 'Invalid email',
  nameRequired = 'Name is required field',
  passwordRequired = 'Password is required field',
  passwordTooShort = 'Password must be more than 6 symbols',
}
