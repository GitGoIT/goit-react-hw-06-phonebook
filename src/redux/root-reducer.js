import { combineReducers } from 'redux'
import { contactsReducer } from '../redux/contacts/contacts-reducer'
import { filterReducer } from '../redux/filter/filter-reducer'

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
})