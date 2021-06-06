import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1622896714197 implements MigrationInterface {
    name = 'migration1622896714197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id")`);
    }

}
