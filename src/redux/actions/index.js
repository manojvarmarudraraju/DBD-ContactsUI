import actionTypes from '../types';
import { getDataCall, deleteContactCall, updateContactCall, addContactCall, getWithSearchCall, addOptionCall } from './axiosCalls';


export var setSearch = (data) => {
    return {type: actionTypes.SET_SEARCH, payload: data}
}
var makeReloadFalse = () => {
    return {type: actionTypes.MAKE_RELOAD_FALSE}
};
var getData = () => {
        return {type: actionTypes.GET_DATA}     
};
var getOptionData = (data) => {
    return {type: actionTypes.GET_OPTION_DATA, payload: data}
}
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
            window.alert(error);
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
            window.alert(error);
        })
    }
}

export var updateContact = (data, history) => {
    console.log(data);
    return (dispatch) => {
        updateContactCall(data).then((fullData) => {
            dispatch(getDataSuccess(fullData));
            dispatch(makeReloadFalse());
        }).then(() => {
            history.push("/");
        }).catch((error) => {
            dispatch(getDataFailure(error));
            window.alert(error);
        });
    }
}

export var addContact = (data, history) => {
    return (dispatch) => {
        addContactCall(data).then((fullData) => {
            dispatch(getDataSuccess(fullData));
            dispatch(makeReloadFalse());
        }).then(() => {
            history.push("/");
        }).catch((error) => {
            dispatch(getDataFailure(error));
            window.alert(error);
        });
    }
}

export var getWithSearch = (data) => {
    return dispatch => {
        getWithSearchCall(data).then((fullData) => {
            dispatch(getDataSuccess(fullData));
            dispatch(makeReloadFalse());
        }).catch((error) => {
            dispatch(getDataFailure(error)); 
            window.alert(error);
        })
    }
}

export var optionAdd = (data) => {
    return dispatch => {
        addOptionCall(data).then((fullData) => {
            dispatch(getOptionData(fullData.data.options));
            dispatch(makeReloadFalse());
        }).catch((error) => {
            dispatch(getDataFailure(error)); 
            window.alert(error);
        })
    }
}