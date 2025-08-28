// src/components/transactions/TransactionList.jsx
import { useGlobalState } from '../../context/GlobalState';
import { TransactionItem } from './TransactionItem';

function TransactionList() {
    const { transactions, loading, error } = useGlobalState();

    if (loading) {
        return (
            <div className="mt-4">
                <h3 className='text-white text-xl font-bold mb-3'>Historial</h3>
                <div className="bg-zinc-800 p-4 rounded-lg">
                    <div className="flex items-center justify-center py-8">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="ml-2 text-white">Cargando transacciones...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4">
                <h3 className='text-white text-xl font-bold mb-3'>Historial</h3>
                <div className="bg-zinc-800 p-4 rounded-lg">
                    <div className="text-center py-8">
                        <div className="text-red-400 mb-2">❌ Error al cargar transacciones</div>
                        <div className="text-gray-400 text-sm">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="mt-4">
                <h3 className='text-white text-xl font-bold mb-3'>Historial</h3>
                <div className="bg-zinc-800 p-4 rounded-lg">
                    <div className="h-full flex items-center justify-center w-full flex-col py-8">
                        <div className="text-4xl mb-3">💰</div>
                        <h1 className="text-xl font-bold my-2 text-white">
                            No hay transacciones aún
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Añade tu primera transacción para empezar
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h3 className='text-white text-xl font-bold mb-3'>
                Historial ({transactions.length})
            </h3>
            <div className="bg-zinc-800 rounded-lg">
                <ul className="max-h-[300px] overflow-y-auto divide-y divide-zinc-700 custom-scroll">
                    {transactions.map(transaction => (
                        <TransactionItem 
                            key={transaction.id} 
                            transaction={transaction} 
                            className="hover:bg-zinc-700/50 transition-colors mb-0" 
                        />     
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TransactionList;