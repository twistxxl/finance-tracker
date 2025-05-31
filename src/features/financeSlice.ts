import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFinanceItems,
  addFinanceItem as apiAddFinanceItem,
  FinanceItem
} from '../api/financeApi.ts';

interface FinanceState {
  items: FinanceItem[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
}

const PAGE_SIZE = 5

const initialState: FinanceState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1
}

export const loadItems = createAsyncThunk(
  'finance/loadItems',
  async (_, { getState }) => {
    const { page } = (getState() as { finance: FinanceState }).finance
    const response = await fetchFinanceItems({ page, limit: PAGE_SIZE })
    console.log(response.data)
    
    return {
      items: response.data,
      hasMore: response.data.length === PAGE_SIZE
    }
  }
)

export const loadMoreItems = createAsyncThunk(
  'finance/loadMoreItems',
  async (_, { getState }) => {
    const { page } = (getState() as { finance: FinanceState }).finance
    const nextPage = page + 1;
    const response = await fetchFinanceItems({ 
      page: nextPage, 
      limit: PAGE_SIZE 
    })
    
    return {
      items: response.data,
      hasMore: response.data.length === PAGE_SIZE,
      page: nextPage
    }
  }
)

export const addItem = createAsyncThunk(
  'finance/addItem',
  async (item: Omit<FinanceItem, 'id'>, { dispatch }) => {
    const response = await apiAddFinanceItem(item)
    dispatch(loadItems())
    return response.data
  }
)

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.hasMore = action.payload.hasMore
        state.loading = false
        state.page = 1
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load items'
      })
      .addCase(loadMoreItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadMoreItems.fulfilled, (state, action) => {
        if (action.payload.items.length > 0) {
          state.items = [...state.items, ...action.payload.items]
          state.hasMore = action.payload.hasMore
          state.page = action.payload.page
        } else {
          state.hasMore = false
        }
        state.loading = false
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addItem.fulfilled, (state) => {
        state.loading = false
      })
  }
})

export default financeSlice.reducer