import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { SalesforceService } from './salesforce.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/guards/jwt-auth.guard';

enum SalesforceRoutes {
  salesforce = 'salesforce',
  account = 'account',
  createAccount = 'create-account',
  contact = 'contact',
}

export interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Controller(SalesforceRoutes.salesforce)
export class SalesforceController {
  constructor(private readonly salesforceService: SalesforceService) {}

  @Post(SalesforceRoutes.createAccount)
  @UseGuards(JwtAuthGuard)
  async createAccount(
    @Body() userData: UserData,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;
    return this.salesforceService.createAccountAndContact(userData, userId);
  }

  @Get(`${SalesforceRoutes.account}/:id`)
  @UseGuards(JwtAuthGuard)
  async getAccount(
    @Param('id') accountId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;
    return this.salesforceService.getAccountById(accountId, userId);
  }

  @Put(`${SalesforceRoutes.account}/:id`)
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @Param('id') accountId: string,
    @Body() updateData,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;
    return this.salesforceService.updateAccount(accountId, updateData, userId);
  }

  @Get(`${SalesforceRoutes.contact}/:id`)
  async getContact(@Param('id') contactId: string) {
    return this.salesforceService.getContactById(contactId);
  }

  @Put(`${SalesforceRoutes.contact}/:id`)
  async updateContact(@Param('id') contactId: string, @Body() updateData) {
    return this.salesforceService.updateContact(contactId, updateData);
  }
}
