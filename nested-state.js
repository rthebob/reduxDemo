const redux = require('redux')
const reduxToolkit = require('@reduxjs/toolkit')
const configureStore = reduxToolkit.configureStore
const createStore =  redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const produce = require('immer').produce


const initiState = {
    name: 'Vishwas',
    adress: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
}

const STREET_UPDATE = 'STREET_UPDATE'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATE,
        payload: street,
    }
}

const reducer = (state = initiState, action) => {
    switch(action.type) {
        case STREET_UPDATE: 
       // return {
        //    ...state,
       //     adress: {
         //       ...state.adress,
         //       street: action.payload,
         //   },
      //  }
      return produce(state, (draft) => {
        draft.adress.street = action.payload
      })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()