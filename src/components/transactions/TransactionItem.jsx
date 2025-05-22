

import { useGlobalState } from "../../context/GlobalState";
import { BiTrash } from 'react-icons/bi'

export function TransactionItem({ transaction: { id, description, amount } }) {
  const { deleteTransaction } = useGlobalState();
  const isIncome = amount > 0;
  const sign = isIncome ? "+" : "-";
  const absAmount = Math.abs(amount).toFixed(2);

  return (
    <li
      key={id}
      className={`
        flex justify-between items-center p-3 mb-2 rounded-lg
        bg-zinc-700 hover:bg-zinc-600 transition-colors
      `}
    >
      <span className="font-medium truncate max-w-[180px]">
        {description}
      </span>
      
      <div className="flex items-center">
        <span className={`font-bold ${isIncome ? "text-green-400" : "text-red-400"}`}>
          {sign}${absAmount}
        </span>
        <button
          onClick={() => deleteTransaction(id)}
          className="ml-3 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Eliminar transacción"
        >
          <BiTrash className={`${isIncome ? "text-green-200/80 hover:text-green-200" : "text-red-200/80 hover:text-red-200"}`} />
        </button>
      </div>
    </li>
  );
}
