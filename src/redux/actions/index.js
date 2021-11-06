import actionTypes from '../types';
import { getDataCall, deleteContactCall, updateContactCall } from './axiosCalls';

var getData = () => {
        return {type: actionTypes.GET_DATA}     
};
var getDataSuccess = (data) => {
    console.log("Data",data);
        var payload = {
            data: data.data.data,
            options: data.data.options
        }
        return {type: actionTypes.GET_DATA_SUCCESS, payload};
};
var getDataFailure = (error) => {
        return {type: actionTypes.GET_DATA_FAILURE, payload: error}; 
};
export var loadData = () => {
    return (dispatch) => {
        dispatch(getData());
        getDataCall().then((data) => {
            dispatch(getDataSuccess(data));
        }).catch((error) => {
            dispatch(getDataFailure(error));
        });
    }
};

export var deleteContact = (data) => {
    return (dispatch) => {
        dispatch(getData());
        deleteContactCall(data).then((data) => {
            dispatch(getDataSuccess(data));
        }).catch((error) => {
            dispatch(getDataFailure(error));
        })
    }
}

export var updateContact = (data, history) => {
    console.log(data);
    return (dispatch) => {
        updateContactCall(data).then((fullData) => {
            dispatch(getDataSuccess(fullData));
        }).catch((error) => {
            dispatch(getDataFailure(error));
        })
    }
}