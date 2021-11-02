import { combineReducers } from 'redux';

var initialState = {
    data: [],
    data_loading: false,
    data_error: null,
    options: [],
}

function dataReducer(currentState = initialState, action){
    if(action.type === 'GET_DATA') {
        const newState = {
            ...currentState,
            data_loading: true,
            data_error: null,
            options: []
        }
        return newState;
    }
    if(action.type === 'GET_DATA_SUCCESS') {
        const newState = {
            ...currentState,
            data_loading: false,
            data_error: null,
            data: action.payload.data,
            options: action.payload.options
        }
        return newState;
    }
    if(action.type === 'GET_DATA_FAILURE'){
        const newState = {
            ...currentState,
            data_loading: false,
            data_error: action.payload,
            data: [],
            options: []
        }
        return newState;
    }

    return currentState;
}


const rootReducer = combineReducers({
    contacts: dataReducer,
});


export default rootReducer;