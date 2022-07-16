import {
    SET_LOGIN_USERNAME,
    SET_LOGIN_PASSWORD,
    SET_REGISTER_USERNAME,
    SET_REGISTER_PASSWORD,
    SET_REGISTER_PASSWORD_AGAIN,
    SET_CURRENT_USER_ID,
    GET_QUESTIONS,
    INCREASE_CORRECT_COUNTER,
} from '../actions/actions';

const initialStateLogin = {
    username: '',
    password: '',
};

const initialStateRegister = {
    username: '',
    password: '',
    passwordAgain: '',
}

const initialStateCurrentUser = {
    user_id: -1,
}

const initialStateQuestions = {
    questions: [],
}

const initialStateCorrectAnswerCounter = {
    correctAmount: 0,
}

export const correctAnswerCounterReducer = (state = initialStateCorrectAnswerCounter, action) => {
    switch (action.type) {
        case INCREASE_CORRECT_COUNTER:
            return {...state, correctAmount: action.payload};
        default:
            return state;
    }
}

export const loginReducer = (state = initialStateLogin, action) => {
    switch (action.type) {
        case SET_LOGIN_USERNAME:
            return {...state, username: action.payload};
        case SET_LOGIN_PASSWORD:
            return {...state, password: action.payload};
        default:
            return state;
    }
}

export const registerReducer = (state = initialStateRegister, action) => {
    switch (action.type) {
        case SET_REGISTER_USERNAME:
            return {...state, username: action.payload};
        case SET_REGISTER_PASSWORD:
            return {...state, password: action.payload};
        case SET_REGISTER_PASSWORD_AGAIN:
            return {...state, passwordAgain: action.payload};
        default:
            return state;
    }
}

export const currentUserIdReducer = (state = initialStateCurrentUser, action) => {
    switch (action.type) {
        case SET_CURRENT_USER_ID:
            return {...state, user_id: action.payload};
        default:
            return state;
    }
}

export const questionReducer = (state = initialStateQuestions, action) => {
    switch (action.type) {
        case GET_QUESTIONS:
            return {questions: action.payload};
        default:
            return state;
    }
}
