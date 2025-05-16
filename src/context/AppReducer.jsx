export default (state, action) => {
    switch(action.type) {
        case "ADD_TRANSACTION": //esta es lo que llama la funcion de agregado en globalstate
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };
            case "DELETE_TRANSACTION":
                return{
                    ...state,
                    transactions:state.transactions.filter((transaction) => transaction.id !== action.payload),
                }
            default:
                return state;
    }
}