const requestSuppliersType = 'REQUEST_SUPPLIERS';
const receiveSuppliersType = 'RECEIVE_SUPPLIERS';
const requestSuppliersError = 'REQUEST_SUPPLIERS_ERROR';

const initialState = {
    suppliers: [],
    supplierId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestSuppliers: () => async (dispatch) => {
        dispatch({ type: requestSuppliersType });
        var result = JSON.parse('[{ "supplierid":"1", "suppliername":"SupplierName1" },{ "supplierid":"2", "suppliername":"SupplierName2" },{ "supplierid":"3", "suppliername":"SupplierName3" }]');
        dispatch({ type: receiveSuppliersType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestSuppliersType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveSuppliersType:
            return {
                ...state,
                suppliers: action.result,
                isLoading: false,
                isError: false
            };

        case requestSuppliersError:
            return {
                ...state,

                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};