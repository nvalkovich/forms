import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1740274162586 implements MigrationInterface {
    name = 'Initial1740274162586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."question_type_enum" AS ENUM('singleLineString', 'multiLineString', 'positiveInteger', 'checkbox')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "type" "public"."question_type_enum" NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "required" boolean NOT NULL DEFAULT false, "showInResults" boolean NOT NULL DEFAULT false, "options" json, "order" integer, "templateId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "isPublic" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "topicId" uuid, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "isBlocked" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template_users_user" ("templateId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6aae68800c30c5d1e225f87e5de" PRIMARY KEY ("templateId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_159b40214adc35669a233fdf95" ON "template_users_user" ("templateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1107c3d795e059df828184337b" ON "template_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "template_tags_tag" ("templateId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_7522e3d33346678a841ec136113" PRIMARY KEY ("templateId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e5ac64168803ebfabf2965c260" ON "template_tags_tag" ("templateId") `);
        await queryRunner.query(`CREATE INDEX "IDX_04678c1037e6097b4fa223e94b" ON "template_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_bec00b079fd2a00b638832ea8d3" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_5726013f236e9c660d6a77acd47" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_c04f0d8f760d5f3ab1765ca9aa1" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template_users_user" ADD CONSTRAINT "FK_159b40214adc35669a233fdf956" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "template_users_user" ADD CONSTRAINT "FK_1107c3d795e059df828184337b2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "template_tags_tag" ADD CONSTRAINT "FK_e5ac64168803ebfabf2965c260a" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "template_tags_tag" ADD CONSTRAINT "FK_04678c1037e6097b4fa223e94b4" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template_tags_tag" DROP CONSTRAINT "FK_04678c1037e6097b4fa223e94b4"`);
        await queryRunner.query(`ALTER TABLE "template_tags_tag" DROP CONSTRAINT "FK_e5ac64168803ebfabf2965c260a"`);
        await queryRunner.query(`ALTER TABLE "template_users_user" DROP CONSTRAINT "FK_1107c3d795e059df828184337b2"`);
        await queryRunner.query(`ALTER TABLE "template_users_user" DROP CONSTRAINT "FK_159b40214adc35669a233fdf956"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_c04f0d8f760d5f3ab1765ca9aa1"`);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_5726013f236e9c660d6a77acd47"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_bec00b079fd2a00b638832ea8d3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04678c1037e6097b4fa223e94b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5ac64168803ebfabf2965c260"`);
        await queryRunner.query(`DROP TABLE "template_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1107c3d795e059df828184337b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_159b40214adc35669a233fdf95"`);
        await queryRunner.query(`DROP TABLE "template_users_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
