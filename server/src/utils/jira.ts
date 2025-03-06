import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

export const USER_ALREADY_EXIST_ERROR_MESSAGE = 'User already exists';

interface JiraErrorResponse {
  errorMessages?: string[];
}

export const extractTemplateIdFromUrl = (url: string): string | null => {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const templateIndex = pathParts.indexOf('templates');

  if (templateIndex !== -1 && pathParts.length > templateIndex + 1) {
    return pathParts[templateIndex + 1];
  }

  return null;
};

export const handleJiraExistError = (error: AxiosError<JiraErrorResponse>) => {
  if (
    error.response?.status === HttpStatus.BAD_REQUEST &&
    error.response.data?.errorMessages?.includes(
      USER_ALREADY_EXIST_ERROR_MESSAGE,
    )
  ) {
    return;
  }
  throw error;
};
