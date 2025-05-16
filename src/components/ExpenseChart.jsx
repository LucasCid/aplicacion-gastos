import { VictoryPie, VictoryLabel } from 'victory'
import { useGlobalState } from '../context/GlobalState'
import { BsPieChartFill } from "react-icons/bs";

function ExpenseChart() {

    const { transactions } = useGlobalState()

    // const total = transactions.reduce((acc, transaction) => (acc += transaction.amount), 0);

    const totalIncome = transactions.filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => (acc += transaction.amount), 0);

    const totalExpense = transactions.filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => (acc += transaction.amount), 0)
        * -1;
    
    const totalExpensesPercentage = Math.round((totalExpense / totalIncome) * 100);
    const totalIncomePercentage = 100 - totalExpensesPercentage;

     if (totalIncome === 0 && totalExpense === 0) {
     return (
       <div className="bg-zinc-900 p-4 my-2">
         <div className="h-full flex items-center justify-center w-full flex-col">
           <BsPieChartFill className="text-9xl" />
           <h1 className="text-3xl font-bold my-2">No hay datos aún</h1>
         </div>
       </div>
     );
   }

    return (
        <VictoryPie
            colorScale={["rgb(235, 72, 72)", "rgb(61, 209, 204)"]}
            data={[
                { x: "Gastos", y: totalExpensesPercentage},
                { x: "Ingresos", y: totalIncomePercentage },
            ]}
            animate={{
                duration: 200
            }}
            labels={({ datum }) => `${datum.y}%`}
            labelComponent={<VictoryLabel
                angle={45}
                style={{
                    fill: "white"
                }}
            />}
        />
    )
}

export default ExpenseChart