import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Query,
  UseGuards
} from '@nestjs/common';
import { JiraService } from './jira.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { AuthenticatedRequest } from '../auth/guards/jwt-auth.guard';
import { CreateIssueData } from 'src/types/types';

const defaultPaginationValues = {
  page: '0',
  pageSize: '5',
};

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Post('create-user')
  @UseGuards(OptionalJwtAuthGuard)
  async createUser(
    @Req() req: AuthenticatedRequest,
    @Body() data: { emailAddress: string },
  ) {
    try {
      const userId = req.user?.id;

      let jiraUser = await this.jiraService.searchUserByEmail(
        data.emailAddress,
        userId,
      );

      if (!jiraUser) {
        jiraUser = await this.jiraService.createUser(data.emailAddress, userId);
      }

      await Promise.all([
        this.jiraService.addUserToProjectRole(jiraUser.accountId),
        this.jiraService.addUserToProjectGroup(jiraUser.accountId),
      ]);

      return jiraUser;
    } catch (e) {
      console.error(e.message);
      throw new e();
    }
  }

  @Post('create-issue')
  async createIssue(@Body() issueData: CreateIssueData) {
    return this.jiraService.createIssue(issueData);
  }

  @Get('issues')
  @UseGuards(JwtAuthGuard)
  async getIssuesByReporter(
    @Query('accountId') accountId: string,
    @Query('page') page: string = defaultPaginationValues.page,
    @Query('pageSize') pageSize: string = defaultPaginationValues.pageSize,
  ) {
    return this.jiraService.getIssuesByReporter(
      accountId,
      parseInt(page),
      parseInt(pageSize),
    );
  }

  @Get('search-user-by-email')
  @UseGuards(OptionalJwtAuthGuard)
  async searchUserByEmail(@Query('email') email: string) {
    return this.jiraService.searchUserByEmail(email);
  }
}
