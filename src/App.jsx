// import { GlobalProvider } from "./context/GlobalState";
// import { useState, useEffect } from "react"; // Importamos los hooks necesarios
// import Header from "./components/Header";
// import Balance from "./components/Balance";
// import TransactionForm from "./components/transactions/TransactionForm";
// import TransactionList from "./components/transactions/TransactionList";
// import IncomeExpenses from "./components/IncomeExpenses";
// import ExpenseChart from "./components/ExpenseChart";

// function App() {
//   const [showTooltip, setShowTooltip] = useState(true);

//   useEffect(() => {
//     // Configuramos un temporizador para ocultar el tooltip después de 3 segundos
//     const timer = setTimeout(() => {
//       setShowTooltip(false);
//     }, 4000);

//     // Limpiamos el temporizador si el componente se desmonta
//     return () => clearTimeout(timer);
//   }, []); // El array vacío asegura que esto solo se ejecute una vez al montar

//   return (
//     <GlobalProvider>
//       <div className="bg-zinc-900 text-white min-h-screen py-8 px-4 flex justify-center items-start md:items-center">
//         {/* Tooltip/Burbuja - Ahora controlado por estado */}
//         {showTooltip && (
//           <div className="fixed top-4 right-4 animate-fade-in">
//             <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg flex items-center">
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 mr-2" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
//                 />
//               </svg>
//               <div>
//                 <p className="font-medium">Bienvenido a AdminDinero! 💰</p>
//                 <p className="text-s mt-1">Desplazate por los laterales👉</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="container mx-auto w-full px-4 md:w-3/6 lg:w-3/5">
//           <div className="bg-zinc-800 p-4 md:p-8 rounded-lg flex flex-col md:flex-row gap-6">
//             <div className="md:w-1/2">
//               <h1 className="text-2xl md:text-3xl font-bold mb-6">AdminDinero💰📈</h1>
//               <IncomeExpenses />
//               <Balance />
//               <TransactionForm />
//             </div>
//             <div className="md:w-1/2 flex flex-col gap-4">
//               <ExpenseChart />
//               <TransactionList />
//             </div>
//           </div>
//         </div>
//       </div>
//     </GlobalProvider>
//   )
// }

// export default App;

import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import IncomeExpenses from "./components/IncomeExpenses";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Verificamos el ancho de la pantalla al montar el componente
    const checkScreenSize = () => {
      if (window.innerWidth <= 500) {
        setShowTooltip(true);
        
        // Configuramos el temporizador solo si es móvil
        const timer = setTimeout(() => {
          setShowTooltip(false);
        }, 4000);

        return () => clearTimeout(timer);
      }
    };

    checkScreenSize();

    // Opcional: añadir listener para cambios de tamaño si quieres que reaparezca al redimensionar
    const handleResize = () => {
      if (window.innerWidth <= 500 && !showTooltip) {
        setShowTooltip(true);
        const timer = setTimeout(() => {
          setShowTooltip(false);
        }, 4000);
        return () => clearTimeout(timer);
      } else if (window.innerWidth > 500) {
        setShowTooltip(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GlobalProvider>
      <div className="bg-zinc-900 text-white min-h-screen py-8 px-4 flex justify-center items-start md:items-center">
        {/* Tooltip solo visible en móviles */}
        {showTooltip && (
          <div className="fixed top-4 right-4 animate-fade-in sm:hidden">
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-lg flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <div>
                <p className="font-medium">Bienvenido a AdminDinero! 💰</p>
                <p className="text-s mt-1">Desplazate por los laterales👉</p>
              </div>
            </div>
          </div>
        )}

        {/* Resto de tu código... */}
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