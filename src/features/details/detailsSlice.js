import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const detailsSlice = createSlice({
    name: 'details',
    initialState: {},
    reducers: {
        fetchSingleContactSuccess: (state, action) => {
            return {
                ...action.payload
            };
        } 
    }
})

const { fetchSingleContactSuccess } = detailsSlice.actions;

export const fetchSingleContact = (id) => dispatch => {
    axios.get(`https://reqres.in/api/users/${id}`)
        .then(({data}) => {
            dispatch(fetchSingleContactSuccess(data.data))
        })
}

export const selectContacts = state => state.list.contacts;

export default detailsSlice.reducer;