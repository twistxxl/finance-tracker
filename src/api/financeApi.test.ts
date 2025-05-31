import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  fetchFinanceItems,
  addFinanceItem,
  FinanceItem,
} from './financeApi';

const mock = new MockAdapter(axios);

describe('financeApi', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetchFinanceItems: успешный GET-запрос', async () => {
    const mockData: FinanceItem[] = [{
      id: "2r2d",
      date: '2023-01-01',
      description: 'Зарплата',
      amount: 1000,
      category: 'доход',
      type: 'доход'
    }];

    mock.onGet('/financeItems').reply(config => {
      expect(config.params).toEqual({
        _start: 0,
        _end: 5,
        _sort: 'date',
        _order: 'desc'
      });
      return [200, mockData];
    });

    const response = await fetchFinanceItems({ page: 1, limit: 5 });
    expect(response.data).toEqual(mockData);
  });

  test('fetchFinanceItems: обработка ошибки 404', async () => {
    mock.onGet('/financeItems').reply(404);
    await expect(fetchFinanceItems({ page: 1, limit: 5 })).rejects.toThrow('HTTP status 404');
  });

  test('addFinanceItem: успешный POST-запрос', async () => {
    const newItem: Omit<FinanceItem, 'id'> = {
      date: '2023-01-02',
      description: 'Кофе',
      amount: 5,
      category: 'Еда',
      type: 'расход',
    };
    const mockResponse: FinanceItem = { ...newItem, id: '21ds' };

    mock.onPost('/financeItems').reply(201, mockResponse);

    const response = await addFinanceItem(newItem);
    expect(response.data).toEqual(mockResponse);
  });

  test('Обработка ошибки сети', async () => {
    mock.onGet('/financeItems').networkError();
    await expect(fetchFinanceItems({ page: 1, limit: 5 })).rejects.toThrow();
  });
});