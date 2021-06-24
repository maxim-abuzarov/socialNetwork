const CATCH_ERROR = 'CATCH-ERROR';

let initialState = {
    error: false,
    errorMessage: null,
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATCH_ERROR:
            return {
                ...state,
                error: action.error,
                errorMessage: action.errorMessage
            }

        default:
            return state;
    }
}

export const catchError = (error, errorMessage) => ({type: CATCH_ERROR, error, errorMessage})

export default errorReducer;
