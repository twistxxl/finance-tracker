import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store.ts';
import { addItem } from '../../features/financeSlice.ts';

interface FormData {
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}
interface AddFinanceFormProps {
  onSuccess?: () => void
}

const AddFinanceForm: React.FC<AddFinanceFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm<FormData>()
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: FormData) => {
    dispatch(addItem({ ...data }))
    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 p-4 max-w-sm mx-auto">
      <input {...register('date')} type="date" className="border p-2" required />
      <input {...register('amount')} type="number" placeholder="Сумма" className="border p-2" required />
      <input {...register('category')} placeholder="Категория" className="border p-2" required />
      <input {...register('description')} placeholder="Описание" className="border p-2" required />
      <select {...register('type')} className="border p-2" required>
        <option value="доход">Доход</option>
        <option value="расход">Расход</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Добавить</button>
    </form>
    
  )
}

export default AddFinanceForm