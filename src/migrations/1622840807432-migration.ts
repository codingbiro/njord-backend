import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622840807432 implements MigrationInterface {
    name = 'migration1622840807432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" character varying(44) NOT NULL, "user_id" integer, "content" text NOT NULL, "flash" text NOT NULL, "updated_at" integer NOT NULL, "created_at" integer NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
