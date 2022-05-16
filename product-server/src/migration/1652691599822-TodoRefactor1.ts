import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoRefactor11652691599822 implements MigrationInterface {
    name = 'TodoRefactor11652691599822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`name\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`title\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`title\` \`name\` varchar(255) NOT NULL`);
    }

}
