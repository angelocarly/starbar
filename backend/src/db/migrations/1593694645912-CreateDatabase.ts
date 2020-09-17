import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1593694645912 implements MigrationInterface {
    name = "CreateDatabase1593694645912"

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("CREATE TABLE \"consumption\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"price\" real NOT NULL, \"categoryId\" integer, CONSTRAINT \"PK_90c8f17309014e5d0f244767367\" PRIMARY KEY (\"id\"))");
    	await queryRunner.query("CREATE TABLE \"category\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_9c4e4a89e3674fc9f382d733f03\" PRIMARY KEY (\"id\"))");
    	await queryRunner.query("CREATE TABLE \"user\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"hash\" character varying NOT NULL, \"salt\" character varying NOT NULL, CONSTRAINT \"UQ_065d4d8f3b5adb4a08841eae3c8\" UNIQUE (\"name\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))");
    	await queryRunner.query("ALTER TABLE \"consumption\" ADD CONSTRAINT \"FK_0aee0cb1d51c40088ca4f14fdcc\" FOREIGN KEY (\"categoryId\") REFERENCES \"category\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    	await queryRunner.commitTransaction();
    	await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.query("ALTER TABLE \"consumption\" DROP CONSTRAINT \"FK_0aee0cb1d51c40088ca4f14fdcc\"");
    	await queryRunner.query("DROP TABLE \"user\"");
    	await queryRunner.query("DROP TABLE \"category\"");
    	await queryRunner.query("DROP TABLE \"consumption\"");
    }

}
