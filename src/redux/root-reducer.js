
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { contactsReducer } from '../redux/contacts/contacts-slice';
import { filterReducer }  from '../redux/filter/filter-slice';

export const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
});

const persistConfig = {
    key: 'contacts',
    storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)