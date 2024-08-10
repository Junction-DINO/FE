import { delay, http, HttpResponse } from 'msw';
import { MOCK_PRODUCTS } from '@/fixture/product';

export const handlers = [
  http.get('/error', async () => {
    await delay(200);
    return HttpResponse.json(
      {
        message: 'mock 에러입니다',
      },
      { status: 400 },
    );
  }),

  http.get(`/api/v1/search`, () => {
    return HttpResponse.json({ ...MOCK_PRODUCTS });
  }),

  // http.post('/personalInfo', () => {
  //   return HttpResponse.json({ ...MOCK_PRODUCT });
  // }),
];
