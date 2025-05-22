
 import { useState } from "react";
 import { useGlobalState } from '../../context/GlobalState';
 export function TransactionForm() {
   const { addTransaction } = useGlobalState();
   const [description, setDescription] = useState("");
   const [amount, setAmount] = useState(0);
   const [isIncome, setIsIncome] = useState(true);
   const onSubmit = (e) => {
     e.preventDefault();
     const finalAmount = isIncome ? Math.abs(+amount) : -Math.abs(+amount);
     addTransaction({
       id: window.crypto.randomUUID(),
       description,
       amount: finalAmount,
     });
     setDescription("");
     setAmount("");
   };
   return (
     <div className="bg-zinc-800 p-4 rounded-lg">
       <div className="flex gap-2 mb-4">
         <button
           type="button"
           className={`flex-1 py-2 text-sm md:text-base rounded-lg transition-colors ${
             isIncome ? "bg-green-600 hover:bg-green-700" : "bg-zinc-600 hover:bg-zinc-500"
           }`}
           onClick={() => setIsIncome(true)}
         >
           Ingreso
         </button>
         <button
           type="button"
           className={`flex-1 py-2 text-sm md:text-base rounded-lg transition-colors ${
             !isIncome ? "bg-red-600 hover:bg-red-700" : "bg-zinc-600 hover:bg-zinc-500"
           }`}
           onClick={() => setIsIncome(false)}
         >
           Gasto
         </button>
       </div>
       <form onSubmit={onSubmit} className="space-y-3">
         <input
           type="text"
           placeholder="Descripción"
           onChange={(e) => setDescription(e.target.value)}
           className="bg-zinc-600 text-white px-3 py-2 rounded-lg block w-full 
           placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
           value={description}
           required
         />
         <input
           type="number"
           step="0.01"
           placeholder="00.00"
           onChange={(e) => setAmount(e.target.value)}
           className="bg-zinc-600 text-white px-3 py-2 rounded-lg block w-full
           placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
           value={amount}
           required
         />
         <button
           type="submit"
           className="bg-indigo-600 text-white px-3 py-2 rounded-lg block w-full
           hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
         >
           Añadir transacción
         </button>
       </form>
     </div>
   );
 }
 export default TransactionForm;


