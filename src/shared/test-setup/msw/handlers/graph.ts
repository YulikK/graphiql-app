import { HttpResponse, http } from 'msw';

const URL_API = 'https://api.url.com';

export const testAnswer = {
  data: {
    person: {
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      eyeColor: 'blue',
    },
  },
};

const handlers = [http.get(`${URL_API}`, () => HttpResponse.json(testAnswer))];

export default handlers;
