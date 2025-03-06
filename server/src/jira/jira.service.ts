import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Buffer } from 'buffer';
import { UserService } from '../user/user.service';
import { TemplateService } from 'src/template/template.service';
import {
  CreateIssueData,
  StatusValuesIds,
  PriorityValuesIds,
  IssueCustomFields,
  JiraUser,
  JiraProducts,
  EnvVariables,
} from 'src/types/types';
import { JIRA_CONSTANTS } from 'src/constants';
import { handleJiraExistError, extractTemplateIdFromUrl } from 'src/utils/jira';

const { PROJECT_KEY, SERVICE_DESK, CUSTOMER } = JIRA_CONSTANTS;

@Injectable()
export class JiraService {
  private readonly jiraBaseUrl: string | undefined;
  private readonly jiraEmail: string | undefined;
  private readonly jiraApiToken: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly templateService: TemplateService,
  ) {
    this.jiraBaseUrl = this.configService.get<string>(EnvVariables.jiraBaseUrl);
    this.jiraEmail = this.configService.get<string>(EnvVariables.jiraEmail);
    this.jiraApiToken = this.configService.get<string>(
      EnvVariables.jiraApiToken,
    );
  }

  private getAuthHeader() {
    const auth = Buffer.from(`${this.jiraEmail}:${this.jiraApiToken}`).toString(
      'base64',
    );
    return {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    };
  }

  async getTemplateNameById(templateId: string): Promise<string | null> {
    try {
      const template = await this.templateService.findOne(templateId);
      return template.title;
    } catch {
      return null;
    }
  }

  async createUser(
    email: string,
    userId?: string,
  ): Promise<JiraUser | undefined> {
    const url = `${this.jiraBaseUrl}/rest/api/3/user`;

    const requestBody = {
      emailAddress: email,
      products: [JiraProducts.software],
      sendInvitation: false,
    };

    const response = await axios.post(url, requestBody, this.getAuthHeader());

    if (userId && response.data.accountId) {
      await this.userService.updateJiraAccountId(
        userId,
        response.data.accountId,
      );
    }

    return response.data;
  }

  async searchUserByEmail(email: string, userId?: string) {
    const url = `${this.jiraBaseUrl}/rest/api/3/user/search?query=${email}`;

    const response = await axios.get(url, this.getAuthHeader());

    if (!response.data.length) {
      return null;
    }

    const data = response.data[0];

    if (userId && data.accountId) {
      await this.userService.updateJiraAccountId(userId, data.accountId);
    }
    return data;
  }

  async addUserToProjectRole(accountId: string) {
    const roleUrl = `${this.jiraBaseUrl}/rest/api/3/project/${PROJECT_KEY}/role/${CUSTOMER.ROLE_ID}`;

    try {
      const getResponse = await axios.get(roleUrl, this.getAuthHeader());
      const roleUsers = getResponse.data.actors;

      const isUserInRole = roleUsers.some(
        (actor) => actor.actorUser?.accountId === accountId,
      );

      if (isUserInRole) {
        return;
      }

      const body = { user: [accountId] };
      const postResponse = await axios.post(
        roleUrl,
        body,
        this.getAuthHeader(),
      );
      return postResponse.data;
    } catch (error) {
      handleJiraExistError(error);
    }
  }

  async addUserToProjectGroup(accountId: string) {
    const groupId = CUSTOMER.GROUP_ID;

    const groupUrl = `${this.jiraBaseUrl}/rest/api/3/group/member?groupId=${groupId}`;
    const addUserToGroupUrl = `${this.jiraBaseUrl}/rest/api/3/group/user?groupId=${groupId}`;

    try {
      const getResponse = await axios.get(groupUrl, this.getAuthHeader());
      const groupMembers = getResponse.data.values;

      const isUserInGroup = groupMembers.some(
        (member) => member.accountId === accountId,
      );

      if (isUserInGroup) {
        return;
      }

      const body = { accountId };
      const postResponse = await axios.post(
        addUserToGroupUrl,
        body,
        this.getAuthHeader(),
      );
      return postResponse.data;
    } catch (error) {
      handleJiraExistError(error);
    }
  }

  async createIssue(issueData: CreateIssueData) {
    const noTemplate = 'No';
    const serviceDeskId = SERVICE_DESK.ID;
    const requestTypeId = SERVICE_DESK.REQUEST_TYPE_ID;

    const templateId = extractTemplateIdFromUrl(issueData.link);

    const templateName = templateId
      ? await this.getTemplateNameById(templateId)
      : null;

    const createIssueBody = {
      serviceDeskId: serviceDeskId,
      requestTypeId: requestTypeId,
      requestFieldValues: {
        summary: issueData.summary,
        [IssueCustomFields.priority]: {
          id: PriorityValuesIds[issueData.priority],
        },
        [IssueCustomFields.status]: {
          id: StatusValuesIds.opened,
        },
        [IssueCustomFields.template]: templateName || noTemplate,
        [IssueCustomFields.link]: issueData.link,
      },
      raiseOnBehalfOf: issueData.accountId,
    };

    try {
      const url = `${this.jiraBaseUrl}/rest/servicedeskapi/request`;
      const response = await axios.post(
        url,
        createIssueBody,
        this.getAuthHeader(),
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async getIssuesByReporter(
    accountId: string,
    page: number = 0,
    pageSize: number = 5,
  ) {
    const startAt = page * pageSize;

    const url = `${this.jiraBaseUrl}/rest/api/3/search?jql=reporter=${accountId}&startAt=${startAt}&maxResults=${pageSize}`;
    const response = await axios.get(url, this.getAuthHeader());

    const issues = response.data.issues.map((issue) => ({
      id: issue.id,
      issueKey: issue.key,
      fields: {
        summary: issue.fields.summary,
        priority: issue.fields[IssueCustomFields.priority],
        status: issue.fields[IssueCustomFields.status],
        template: issue.fields[IssueCustomFields.template],
        link: issue.fields[IssueCustomFields.link],
      },
    }));

    return {
      issues,
      total: response.data.total,
      startAt: response.data.startAt,
      maxResults: response.data.maxResults,
    };
  }
}
