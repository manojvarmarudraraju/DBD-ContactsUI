import actionTypes from '../types';
import { getDataCall } from './axiosCalls';

var getData = () => {
        return {type: actionTypes.GET_DATA}     
};
var getDataSuccess = (data) => {
        var payload = {
            data: data.data,
            options: data.options
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
        }).error((error) => {
            dispatch(getDataFailure(error));
        });
    }
};