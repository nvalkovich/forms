import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSalesforceAccountIdColumnToUserEntity1741031903219
  implements MigrationInterface
{
  name = 'AddSalesforceAccountIdColumnToUserEntity1741031903219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salesforceAccountId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "salesforceAccountId"`,
    );
  }
}
