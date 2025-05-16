import { useGlobalState } from "../context/GlobalState";   //Importando el contexto, que es el estado global de la aplicacion.   

function Balance() {

    const {transactions} = useGlobalState(); //Accedemos al contexto y lo guardamos en la variable data. El useContext es un hook que nos permite acceder al contexto. 

    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    return (
        <div className="flex justify-between">
           
            <h3>Balance</h3>
            <h1 className="text-2xl font-bold">${total}</h1>
        </div>
    )
}

export default Balance;