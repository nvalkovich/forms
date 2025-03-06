import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as jsforce from 'jsforce';
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';
import { ErrorMessageKeys } from 'src/types/types';

enum SalesforceObjectType {
  account = 'Account',
  contact = 'Contact',
}

enum SalesforceErrors {
  failedToGetAuthData = 'Failed to get authentication data',
  authError = 'Authentication failed',
  accountIdNotExist = 'Failed to create Salesforce account: ID not received',
  errorRetrievingAccount = 'Error retrieving account',
  errorUpdatingAccount = 'Error while updating account',
  contactNotFound = 'Contact not found',
  errorUpdatingContact = 'Error while updating contact',
}

const SALESFORCE_LOGIN_URL = 'https://login.salesforce.com';

const DELETED_ENTITY_ERROR_CODE = 'ENTITY_IS_DELETED';
const NOT_EXIST_MESSAGE_PART = 'does not exist';

dotenv.config();

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface UpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

@Injectable()
export class SalesforceService {
  private connection: jsforce.Connection;

  constructor(private readonly userService: UserService) {
    this.connection = new jsforce.Connection({
      loginUrl: SALESFORCE_LOGIN_URL,
    });
  }

  private validateEnvVariables(): void {
    if (
      !process.env.SALESFORCE_USERNAME ||
      !process.env.SALESFORCE_PASSWORD ||
      !process.env.SALESFORCE_SECURITY_TOKEN
    ) {
      throw new InternalServerErrorException(
        SalesforceErrors.failedToGetAuthData,
      );
    }
  }

  async authenticate(): Promise<jsforce.Connection> {
    this.validateEnvVariables();

    const username = process.env.SALESFORCE_USERNAME;
    const password = process.env.SALESFORCE_PASSWORD;
    const securityToken = process.env.SALESFORCE_SECURITY_TOKEN;

    if (!username || !password || !securityToken) {
      throw new InternalServerErrorException(
        SalesforceErrors.failedToGetAuthData,
      );
    }

    try {
      await this.connection.login(username, password + securityToken);
      return this.connection;
    } catch {
      throw new InternalServerErrorException(SalesforceErrors.authError);
    }
  }

  private async createObject<T extends Record<string, unknown>>(
    objectType: SalesforceObjectType,
    data: T,
  ): Promise<jsforce.SaveResult> {
    const connection = await this.authenticate();
    return connection.sobject(objectType).create(data);
  }

  private async updateObject<T extends { Id: string }>(
    objectType: SalesforceObjectType,
    data: T,
  ): Promise<jsforce.SaveResult> {
    const connection = await this.authenticate();
    return connection.sobject(objectType).update(data);
  }

  private async retrieveObject(
    objectType: SalesforceObjectType,
    id: string,
  ): Promise<jsforce.Record> {
    const connection = await this.authenticate();
    return connection.sobject(objectType).retrieve(id);
  }

  private async findOneObject(
    objectType: SalesforceObjectType,
    query: Record<string, string>,
  ): Promise<jsforce.Record | null> {
    const connection = await this.authenticate();
    return connection.sobject(objectType).findOne(query);
  }

  async createAccountAndContact(userData: UserData, userId: string) {
    const accountData = {
      Name: `${userData.firstName} ${userData.lastName}`,
      Phone: userData.phone,
    };

    const accountResult = await this.createObject(
      SalesforceObjectType.account,
      accountData,
    );

    if (!accountResult.id) {
      throw new InternalServerErrorException(
        SalesforceErrors.accountIdNotExist,
      );
    }

    const contactData = {
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Email: userData.email,
      Phone: userData.phone,
      AccountId: accountResult.id,
    };

    const contactResult = await this.createObject(
      SalesforceObjectType.contact,
      contactData,
    );

    await this.userService.updateSalesforceAccountId(userId, accountResult.id);

    return {
      accountId: accountResult.id,
      contactId: contactResult.id,
    };
  }

  async getAccountById(accountId: string, userId: string) {
    try {
      const account = await this.retrieveObject(
        SalesforceObjectType.account,
        accountId,
      );
      return account;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes(NOT_EXIST_MESSAGE_PART)
      ) {
        await this.userService.updateSalesforceAccountId(userId, null);
        throw new NotFoundException(ErrorMessageKeys.salesforceAccountNotExist);
      }
      throw new InternalServerErrorException(
        SalesforceErrors.errorRetrievingAccount,
      );
    }
  }

  async updateAccount(
    accountId: string,
    updateData: UpdateData,
    userId: string,
  ) {
    try {
      const accountUpdateResult = await this.updateObject(
        SalesforceObjectType.account,
        {
          Id: accountId,
          Name: `${updateData.firstName} ${updateData.lastName}`,
          Phone: updateData.phone,
        },
      );

      const contact = await this.findOneObject(SalesforceObjectType.contact, {
        AccountId: accountId,
      });

      let contactUpdateResult: jsforce.SaveResult | null = null;

      if (contact && contact.Id) {
        contactUpdateResult = await this.updateObject(
          SalesforceObjectType.contact,
          {
            Id: contact.Id,
            FirstName: updateData.firstName || contact.FirstName,
            LastName: updateData.lastName || contact.LastName,
            Email: updateData.email || contact.Email,
            Phone: updateData.phone || contact.Phone,
          },
        );
      }

      return {
        success: true,
        account: accountUpdateResult,
        contact: contactUpdateResult,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        'errorCode' in error &&
        error.errorCode === DELETED_ENTITY_ERROR_CODE
      ) {
        await this.userService.updateSalesforceAccountId(userId, null);
        throw new NotFoundException(ErrorMessageKeys.salesforceAccountDeleted);
      }
      throw new InternalServerErrorException(
        SalesforceErrors.errorUpdatingAccount,
      );
    }
  }

  async getContactById(contactId: string) {
    try {
      const contact = await this.retrieveObject(
        SalesforceObjectType.contact,
        contactId,
      );
      return contact;
    } catch {
      throw new NotFoundException(SalesforceErrors.contactNotFound);
    }
  }

  async updateContact(contactId: string, updateData: UpdateData) {
    try {
      const result = await this.updateObject(SalesforceObjectType.contact, {
        Id: contactId,
        ...updateData,
      });
      return result;
    } catch {
      throw new InternalServerErrorException(
        SalesforceErrors.errorUpdatingContact,
      );
    }
  }
}
