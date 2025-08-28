// src/components/transactions/TransactionForm.jsx
import { useState } from "react";
import { useGlobalState } from '../../context/GlobalState';

export function TransactionForm() {
  const { addTransaction, loading } = useGlobalState();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [isIncome, setIsIncome] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const finalAmount = isIncome ? Math.abs(+amount) : -Math.abs(+amount);
    
    await addTransaction({
      description,
      amount: finalAmount,
    });
    
    // Limpiar formulario solo si se guardó exitosamente
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
          disabled={loading}
        >
          Ingreso
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm md:text-base rounded-lg transition-colors ${
            !isIncome ? "bg-red-600 hover:bg-red-700" : "bg-zinc-600 hover:bg-zinc-500"
          }`}
          onClick={() => setIsIncome(false)}
          disabled={loading}
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
          placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50"
          value={description}
          disabled={loading}
          required
        />
        
        <input
          type="number"
          step="0.01"
          placeholder="00.00"
          onChange={(e) => setAmount(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block w-full
          placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50"
          value={amount}
          disabled={loading}
          required
        />
        
        <button
          type="submit"
          className="bg-indigo-600 text-white px-3 py-2 rounded-lg block w-full
          hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </div>
          ) : (
            'Añadir transacción'
          )}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;