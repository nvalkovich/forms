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
  salesforceUsername = 'SALESFORCE_USERNAME',
  salesforcePassword = 'SALESFORCE_PASSWORD',
  salesforceSecurityToken = 'SALESFORCE_SECURITY_TOKEN',
  jiraBaseUrl = 'JIRA_BASE_URL',
  jiraEmail = 'JIRA_EMAIL',
  jiraApiToken = 'JIRA_API_TOKEN',
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
  salesforceAccountDeleted = 'salesforceAccountDeleted',
  salesforceAccountNotExist = 'salesforceAccountNotExist',
}

export enum validationErrors {
  emailRequired = 'Email is required field',
  invalidEmail = 'Invalid email',
  nameRequired = 'Name is required field',
  passwordRequired = 'Password is required field',
  passwordTooShort = 'Password must be more than 6 symbols',
}

export interface SalesforceFormData {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  PersonBirthDate: Date | null;
}

export interface CreateIssueData {
  link: string;
  summary: string;
  priority: string;
  accountId: string;
}

export enum JiraProducts {
  software = 'jira-software',
}

export enum StatusValuesIds {
  opened = '10039',
  inProgress = '10040',
  rejected = '10041',
  fixed = '10045',
}

export enum PriorityValuesIds {
  high = '10042',
  average = '10043',
  low = '10044',
}

export enum IssueCustomFields {
  template = 'customfield_10058',
  link = 'customfield_10059',
  status = 'customfield_10060',
  priority = 'customfield_10061',
}

export interface JiraUser {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
}

export interface IssueFields {
  summary: string;
  priority: { id: string; name?: string };
  status: { id: string; name?: string };
  template: string;
  link: string;
}

interface Issue {
  id: string;
  key: string;
  fields: IssueFields;
}

export interface IssueDataResponse {
  issues: Issue[];
  total: number;
  startAt: number;
  maxResults: number;
}
