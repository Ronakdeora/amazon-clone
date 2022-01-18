export const initialState ={
    basket:[],
    user: null,
};
//Selector 
export const getBasketTotal = (basket) =>  basket?.reduce((amount,item) => item.price + amount, 0);

const reducer =(state,action) =>{

    switch(action.type){
        case "ADD_TO_BASKET":
        return {
            ...state,                     // I don't fullly understan what is happening here  
            basket:[...state.basket , action.item],
        }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItems) => basketItems.id === action.id //this finds the first element that matches the id
            )
            let newBasket = [...state.basket];
            if(index>=0) {
                    newBasket.splice(index,1); //remove 1 element at index 
            } else {
                console.warn(
                    `Can't remove product (id : ${action.id}) as its not in basket!` 
                )
            }
            return {
                ...state,
                basket: newBasket
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "EMPTY_BASKET":
            return {
                ...state,
                basket:[]
            }

        default :
        return state;
    }
}
export default reducer;