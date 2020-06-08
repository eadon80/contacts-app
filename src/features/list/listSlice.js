import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        contacts: {
            data: {}
        },
        favorites: {}
    },
    reducers: {
        fetchContactsSuccess: (state, action) => {
            return {
                ...state,
                contacts: {
                    ...action.payload,
                    data: action.payload.data.reduce((acc, el) => {
                        return {
                            ...acc,
                            [el.id]: el
                        };
                    }, {})
                }
            }
        },
        updateContactsSuccess: (state, action) => {
            state.contacts.data[action.payload.id].favorite = action.payload.favorite;
        },
        deleteContactsSuccess: (state, action) => {
            delete state.contacts.data[action.payload.id];
        }
    }
})

const { fetchContactsSuccess, updateContactsSuccess, deleteContactsSuccess } = listSlice.actions;

export const fetchContacts = (page = 1, per_page = 20) => dispatch => {
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`)
        .then(({data}) => {
            dispatch(fetchContactsSuccess(data));
        })
}

export const updateContacts = (id, favorite) => dispatch => {
    axios.patch(`https://reqres.in/api/users/${id}`, {
        favorite
    })
        .then(data => {
            dispatch(updateContactsSuccess({
                id, data, favorite
            }));
        })
}

export const deleteContact = (id) => dispatch => {
    axios.delete(`https://reqres.in/api/users/${id}`)
        .then(data => {
            dispatch(deleteContactsSuccess({
                id
            }));
        })
}

export const selectContacts = state => state.list.contacts;

export default listSlice.reducer;