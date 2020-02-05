import { connectDatabase } from '../../database';
import { QueryRunner } from 'typeorm';
// if you want to use typedi, put @Service decorator to class
// import { Container } from 'typedi';
let queryRunner: QueryRunner | null = null;

beforeAll(async () => {
  const conn = await connectDatabase();
  queryRunner = conn.createQueryRunner();
  await queryRunner.startTransaction();
});

describe('example service', () => {
  it('New Example', async () => {
    // Container.get("SomethingClass")
    expect(true).toEqual(true);
  });
});

afterAll(async () => {
  if (queryRunner) {
    await queryRunner.release();
  }
});
