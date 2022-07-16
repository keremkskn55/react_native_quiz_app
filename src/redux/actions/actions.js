export const SET_LOGIN_USERNAME = 'SET_LOGIN_USERNAME';
export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';
export const SET_REGISTER_USERNAME = 'SET_REGISTER_USERNAME';
export const SET_REGISTER_PASSWORD = 'SET_REGISTER_PASSWORD';
export const SET_REGISTER_PASSWORD_AGAIN = 'SET_REGISTER_PASSWORD_AGAIN';
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const INCREASE_CORRECT_COUNTER = 'INCREASE_CORRECT_COUNTER';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export const increaseCorrectCounter = correctAmount => dispatch => {
    dispatch({
        type: INCREASE_CORRECT_COUNTER,
        payload: correctAmount,
    });
};

export const getQuestion = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: GET_QUESTIONS,
                    payload: json,
                });
            } else {
                console.log('Unable to fetch');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const setLoginUsername = username => dispatch => {
    dispatch({
        type: SET_LOGIN_USERNAME,
        payload: username,
    });
};

export const setLoginPassword = password => dispatch => {
    dispatch({
        type: SET_LOGIN_PASSWORD,
        payload: password,
    });
};

export const setRegisterUsername = username => dispatch => {
    dispatch({
        type: SET_REGISTER_USERNAME,
        payload: username,
    });
};

export const setRegisterPassword = password => dispatch => {
    dispatch({
        type: SET_REGISTER_PASSWORD,
        payload: password,
    });
};

export const setRegisterPasswordAgain = passwordAgain => dispatch => {
    dispatch({
        type: SET_REGISTER_PASSWORD_AGAIN,
        payload: passwordAgain,
    });
};

export const setCurrentUserId = user_id => dispatch => {
    dispatch({
        type: SET_CURRENT_USER_ID,
        payload: user_id,
    })
}