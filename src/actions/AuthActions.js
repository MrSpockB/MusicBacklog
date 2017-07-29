import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';
import History from '../History';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => _loginUserSuccess(dispatch, user), () => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => _loginUserSuccess(dispatch, user),
                        () =>  _loginUserFail(dispatch));
            });
    };
}

const _loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    History.push('/backlog');
};

const _loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}