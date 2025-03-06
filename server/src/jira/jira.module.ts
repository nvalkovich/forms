import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { UserModule } from '../user/user.module';
import { TemplateModule } from 'src/template/template.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TemplateModule],
  controllers: [JiraController],
  providers: [JiraService],
})
export class JiraModule {}
