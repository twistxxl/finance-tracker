import React from 'react';
import FinanceTable from './components/Table/Table.tsx';
import AddFinanceModal from './components/AddFinanceFormModal/AddFinanceFormModal.tsx';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Finance Tracker</h1>
      <AddFinanceModal />
      <div className="mt-8">
        <FinanceTable />
      </div>
    </div>
  );
};

export default App;