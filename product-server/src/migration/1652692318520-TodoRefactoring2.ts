import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoRefactoring21652692318520 implements MigrationInterface {
    name = 'TodoRefactoring21652692318520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
