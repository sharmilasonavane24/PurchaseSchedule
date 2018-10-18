const requestWorkspacesType = 'REQUEST_WORKSPACES';
const receiveWorkspacesType = 'RECEIVE_WORKSPACES';
const requestWorkspacesError = 'REQUEST_WORKSPACES_ERROR';

const initialState = {
    workspaces: [],
    workspaceId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestWorkspaces: () => async (dispatch) => {
        dispatch({ type: requestWorkspacesType });
        var result = JSON.parse('[{ "workspaceid":"1", "workspacename":"WorkspaceName1" },{ "workspaceid":"2", "workspacename":"WorkspaceName2" },{ "workspaceid":"3", "workspacename":"WorkspaceName3" }]');
        dispatch({ type: receiveWorkspacesType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestWorkspacesType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveWorkspacesType:
            return {
                ...state,
                workspaces: action.result,
                isLoading: false,
                isError: false
            };

        case requestWorkspacesError:
            return {
                ...state,
                
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};