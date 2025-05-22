import { GlobalProvider } from "./context/GlobalState";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import IncomeExpenses from "./components/IncomeExpenses";
import ExpenseChart from "./components/ExpenseChart";




  function App() {
    return (
      <GlobalProvider>
        <div className="bg-zinc-900 text-white min-h-screen py-8 px-4 flex justify-center items-start md:items-center">
          <div className="container mx-auto w-full px-4 md:w-3/6 lg:w-3/5">
            <div className="bg-zinc-800 p-4 md:p-8 rounded-lg flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">AdminDinero💰📈</h1>
                <IncomeExpenses />
                <Balance />
                <TransactionForm />
              </div>
              <div className="md:w-1/2 flex flex-col gap-4">
                <ExpenseChart />
                <TransactionList />
              </div>
            </div>
          </div>
        </div>
      </GlobalProvider>
    )
  }
export default App;