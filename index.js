const redux = require('redux')
const reduxToolkit = require('@reduxjs/toolkit')
const configureStore = reduxToolkit.configureStore
const createStore =  redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//ACTION TYPE
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCK = 'CAKE_RESTOCK'
const ICECREAM_ORDERED = 'ICECREM_ORDERED'
const ICECREM_RESTOCK = 'ICECREAM_RESTOCK'

// ACTION + ACTION CREATORS
function OrderCake(){
    return{
    type: CAKE_ORDERED,
    payload: 1
    }
}

function RestockCake(qty = 1){
    return{
        type: CAKE_RESTOCK,
        payload: qty
    }
}

function orderIceCream(qty = 1){
    return{
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1){
    return{
        type: ICECREM_RESTOCK, 
        payload: qty
    }
}

// INITIAL VALUE
//const initialState = {
//    numOfCakes: 10,
//    numOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// (previousState, action) => newState

// REDUCER
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCK:
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.payload    
            }
       
            default: 
            return state
        
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }

        case ICECREM_RESTOCK:
            return{
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload    
            }
            default: 
            return state
        
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// STORE
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())

// SUBSCRIBE
const unsubscribe = store.subscribe(() => {})


// DISPATCH

// store.dispatch(OrderCake()) //OrderCake ACTION CREATOR
// store.dispatch(OrderCake()) //OrderCake ACTION CREATOR
// store.dispatch(OrderCake()) //OrderCake ACTION CREATOR
// store.dispatch(RestockCake(3)) // RestockCake ACTION CREATOR

const actions = bindActionCreators({ OrderCake, RestockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.OrderCake()
actions.OrderCake()
actions.OrderCake()
actions.RestockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)
//UNSUBSCRIBE
unsubscribe()
