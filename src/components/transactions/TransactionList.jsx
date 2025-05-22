

// import { useGlobalState } from '../../context/GlobalState';
// import { TransactionItem } from './TransactionItem';

// function TransactionList() {
//     const { transactions } = useGlobalState();

//     if (transactions.length === 0) {
//         return (
//             <div className="bg-zinc-900 p-4 my-2 rounded-lg">
//                 <div className="h-full flex items-center justify-center w-full flex-col">
//                     <h1 className="text-xl font-bold my-2">
//                         No hay transacciones aún
//                     </h1>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="mt-4">
//             <h3 className='text-slate-300 text-xl font-bold mb-3'>Historial</h3>
//             <div className="bg-zinc-900 rounded-lg overflow-hidden">
//                 <ul className="max-h-[300px] overflow-y-auto custom-scroll">
//                     {transactions.map(transaction => (
//                         <TransactionItem 
//                             transaction={transaction} 
//                             key={transaction.id} 
//                         />     
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default TransactionList;

import { useGlobalState } from '../../context/GlobalState';
import { TransactionItem } from './TransactionItem';

function TransactionList() {
    const { transactions } = useGlobalState();

    if (transactions.length === 0) {
        return (
            <div className="bg-zinc-800 p-4 my-2 rounded-lg">
                <div className="h-full flex items-center justify-center w-full flex-col">
                    <h1 className="text-xl font-bold my-2 text-white">
                        No hay transacciones aún
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h3 className='text-white text-xl font-bold mb-3'>Historial</h3>
            <div className="bg-zinc-800 rounded-lg">
                <ul className="max-h-[300px] overflow-y-auto divide-y divide-zinc-700 custom-scroll">
                    {transactions.map(transaction => (
                        <li key={transaction.id} className="hover:bg-zinc-700/50 transition-colors">
                            <TransactionItem 
                                transaction={transaction} 
                                // Elimina el margen inferior del TransactionItem
                                className="mb-0" 
                            />     
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TransactionList;