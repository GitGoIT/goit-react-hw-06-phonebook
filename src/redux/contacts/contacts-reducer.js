import {ADD_CONTACT, DELETE_CONTACT} from '../contacts/contacts-types'

const initialState = []

export const contactsReducer = (state = initialState, {type, payload}) => { 
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        case DELETE_CONTACT:
            return state.filter(item => item.id !== payload);
        default:
            return state; 
    }
    
}