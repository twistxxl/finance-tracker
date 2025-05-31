import React, { useState } from 'react';
import AddFinanceForm from '../AddFinanceForm/AddFinanceForm.tsx';
import Modal from '../Modal/Modal.tsx'

const AddFinanceFormModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition-colors"
      >
        +
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить транзакцию"
      >
        <AddFinanceForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}

export default AddFinanceFormModal