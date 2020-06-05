import { createSlice } from '@reduxjs/toolkit';
import { loginMock } from '../../utils/login';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isAuthorized: false,
        errors: {}
    },
    reducers: {
        loginSuccess: (state, action) => {
            return {
                ...state,
                errors: {},
                isAuthorized: true,
                ...action.payload
            }
        },
        loginFailed: (state, action) => {
            return {
                ...state,
                errors: action.payload
            }
        },
        logout: state => {
            return {
                ...state,
                isAuthorized: false
            }
        }
    },
})

export const { loginSuccess, loginFailed } = loginSlice.actions;

export const tryToLogin = (authData) => dispatch => {
    loginMock(authData)
        .then(data => {
            dispatch(loginSuccess(data));
        })
        .catch(err => {
            dispatch(loginFailed(err));
        })
}

export const selectLogin = state => state.login;

export default loginSlice.reducer;