


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