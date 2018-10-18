const requestBuyersType = 'REQUEST_BUYERS';
const receiveBuyersType = 'RECEIVE_BUYERS';
const requestBuyersError = 'REQUEST_BUYERS_ERROR';

const initialState = {
    buyers: [],
    buyerId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestBuyers: () => async (dispatch) => {
        dispatch({ type: requestBuyersType });
        var result = JSON.parse('[{ "buyerid":"1", "buyername":"BuyerName1" },{ "buyerid":"2", "buyername":"BuyerName2" },{ "buyerid":"3", "buyername":"BuyerName3" }]');
        dispatch({ type: receiveBuyersType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestBuyersType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveBuyersType:
            return {
                ...state,
                buyers: action.result,
                isLoading: false,
                isError: false
            };

        case requestBuyersError:
            return {
                ...state,
                
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};