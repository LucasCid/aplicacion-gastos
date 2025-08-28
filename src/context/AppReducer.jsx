// export default (state, action) => {
//     switch(action.type) {
//         case "ADD_TRANSACTION": //esta es lo que llama la funcion de agregado en globalstate
//             return {
//                 ...state,
//                 transactions: [...state.transactions, action.payload]
//             };
//             case "DELETE_TRANSACTION":
//                 return{
//                     ...state,
//                     transactions:state.transactions.filter((transaction) => transaction.id !== action.payload),
//                 }
//             default:
//                 return state;
//     }
// }

// src/context/AppReducer.js
export default (state, action) => {
    switch(action.type) {
        case 'SET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => 
                    transaction.id !== action.payload
                )
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}