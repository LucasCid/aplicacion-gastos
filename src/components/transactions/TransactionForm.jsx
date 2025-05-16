import { useState } from "react";
import { useGlobalState } from '../../context/GlobalState'

export function TransactionForm() {
    const { addTransaction } = useGlobalState();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            id: window.crypto.randomUUID(),
            description,
            amount: +amount,
        });

        setDescription("");
        setAmount(0);
    };


    return (
        <div>

            <form onSubmit={onSubmit}> {/* el onsubmit de un form se dispara cuando se le da el button */}
                <input type="text" placeholder="Ingresa una descripcion"
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
                    value={description}
                />
                <input type="number"
                    step="0.01"
                    placeholder="00.00"
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
                    value={amount}
                />
                <button className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full"
                    value={amount}>
                    Añadir transacción
                </button>
            </form>
        </div>
    )
}
export default TransactionForm;



