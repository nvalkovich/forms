import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJiraAccountToUserEntity1741259165260
  implements MigrationInterface
{
  name = 'AddJiraAccountToUserEntity1741259165260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "jiraAccountId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "jiraAccountId"`);
  }
}
