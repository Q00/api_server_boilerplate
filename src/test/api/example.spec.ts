import supertest from 'supertest';
import { app } from '../../server';

describe('test example feature', () => {
  test('GET /examples', async () => {
    const res = await supertest(app)
      .get('/examples')
      .expect(200);
    expect(res.body).toEqual({ data: 'examples' });
  });
});
