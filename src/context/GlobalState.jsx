// src/context/GlobalState.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext";
import AppReducer from "./AppReducer";
import { 
    addDoc, 
    collection, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';

const initialState = {
    transactions: [],
    loading: false,
    error: null
} 

export const Context = createContext();

export const useGlobalState = () => {
    const context = useContext(Context);
    return context;
}

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const { currentUser } = useAuth();

    // Cargar transacciones del usuario cuando se loguea
    useEffect(() => {
        if (currentUser) {
            loadTransactions();
        } else {
            // Si no hay usuario, limpiar transacciones
            dispatch({ type: "SET_TRANSACTIONS", payload: [] });
        }
    }, [currentUser]);

    // Función para cargar transacciones de Firebase
    const loadTransactions = async () => {
        if (!currentUser) return;

        dispatch({ type: "SET_LOADING", payload: true });
        
        try {
            const q = query(
                collection(db, 'transactions'), 
                where('userId', '==', currentUser.uid),
                orderBy('createdAt', 'desc')
            );
            
            const querySnapshot = await getDocs(q);
            const transactions = [];
            
            querySnapshot.forEach((doc) => {
                transactions.push({ 
                    id: doc.id, 
                    ...doc.data() 
                });
            });
            
            dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
        } catch (error) {
            console.error('Error loading transactions:', error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    // Función para añadir transacción
    const addTransaction = async (transaction) => {
        if (!currentUser) return;

        dispatch({ type: "SET_LOADING", payload: true });
        
        try {
            const transactionData = {
                ...transaction,
                userId: currentUser.uid,
                createdAt: new Date()
            };
            
            const docRef = await addDoc(collection(db, 'transactions'), transactionData);
            
            // Añadir la transacción al estado local con el ID de Firestore
            dispatch({
                type: "ADD_TRANSACTION",
                payload: { 
                    ...transactionData, 
                    id: docRef.id 
                }
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    // Función para eliminar transacción
    const deleteTransaction = async (id) => {
        if (!currentUser) return;

        dispatch({ type: "SET_LOADING", payload: true });
        
        try {
            await deleteDoc(doc(db, 'transactions', id));
            
            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id
            });
        } catch (error) {
            console.error('Error deleting transaction:', error);
            dispatch({ type: "SET_ERROR", payload: error.message });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <Context.Provider 
            value={{
                transactions: state.transactions,
                loading: state.loading,
                error: state.error,
                addTransaction,
                deleteTransaction,
                loadTransactions
            }}
        >
            {children}
        </Context.Provider>
    );
}