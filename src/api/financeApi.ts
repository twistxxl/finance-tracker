import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  validateStatus: function (status) {
    return status >= 200 && status < 300
  }
});

export interface FinanceItem {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'доход' | 'расход'
}

// Получение данных с пагинацией
export const fetchFinanceItems = async (params: { page: number; limit: number }) => {
  const response = await api.get<FinanceItem[]>('/financeItems', {
    params: {
      _start: (params.page - 1) * params.limit,
      _end: params.page * params.limit,
      _sort: 'date',
      _order: 'desc'
    }
  });
  return response
}

// Добавление
export const addFinanceItem = (item: Omit<FinanceItem, 'id'>) => 
  api.post<FinanceItem>('/financeItems', item)
